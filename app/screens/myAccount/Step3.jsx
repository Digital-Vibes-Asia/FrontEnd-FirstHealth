import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {useEffect, useState, useReducer, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import ActionBar from '../../common/ActionBar/actionbar';
import StepTxt from '../../common/TittleBox/steptxt';
import SignupTitle from '../../common/TittleBox/signuptitle';
import NameInputBox from '../../common/textinputbox/nameinputbox';
import NextFhButton from '../../common/Button/nextfhbutton';
import {useGetQuery, usePostMutation} from '../../store/api';
import Progressing from '../../common/Progress/Progressing';
import {UrlBase} from '../../utils/common/urlbase';
import GenderPick from '../../common/textinputbox/genderpick';
import OutlineIcon from '../../common/Button/OutlineIcon';
import FillButton from '../../common/Button/ButtonFill';
import {RetreiveData} from '../../utils/common/UpdateStepData';
import {clear, step1Red, step2Red, step3Red} from '../../store/value';
import FhLoginButton from '../../common/Button/fhloginbutton';

const PIReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {...state, ...action.fields};
    default:
      return state;
  }
};

export default function MedicalInfoUpdate() {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const reg_id = useSelector(state => state.operation?.temp_regid);
  const {step2Data, step1Data, step3Data} = useSelector(
    state => state.operation,
  );

  console.log(reg_id,"ihbisbxi")

  const {data: profileData, error: profileError} = useGetQuery(
    UrlBase.PROFILEVIEW,
  );

  const [step4, {data, error}] = usePostMutation();

  const userData = useMemo(() => {
    return profileData?.user;
  }, [profileData]);

  const registerData = useMemo(() => {
    return profileData?.registration;
  }, [profileData]);

  const subscriptionData = useMemo(() => {
    return profileData?.user_subscription;
  }, [profileData]);

  useEffect(() => {
    RetreiveData(
      step1Red,
      step2Red,
      step3Red,
      setRedux,
      userData,
      registerData,
      step1Data?.first_name,
      step2Data?.address,
    );
  }, [userData, registerData, subscriptionData]);

  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data) + ' Data is here..');
      setRedux(clear());
      navigation.push('MyProfile');
    } else if (error) {
      console.log(error);
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message),
      );
    }
    handleChange({progressBar: false});
  }, [data, error]);

  const [formState, dispatch] = useReducer(PIReducer, {
    allergic_medication_list: '',
    progressBar: false,
    heart_prblm: false,
    no_heart_prblm: false,
    h_e: false,
    d_prblm: false,
    no_d_prblm: false,
    d_e: false,
    a_prblm: false,
    no_a_prblm: false,
    a_e: false,
    at_e: false,
  });

  const handleChange = fields => {
    dispatch({type: 'SET_FIELD', fields});
  };

  function toggle(id) {
    switch (id) {
      case 1:
        handleChange({heart_prblm: true, no_heart_prblm: false});
        break;
      case 2:
        handleChange({heart_prblm: false, no_heart_prblm: true});
        break;
    }
  }
  useEffect(() => {
    console.log(step3Data, 'step 2 data ');
    handleChange({
      allergic_medication_list: step3Data?.allergic_medication_list,
      heart_prblm: step3Data?.heart_problems,
      d_prblm: step3Data?.diabetes,
      a_prblm: step3Data?.allergic,
      no_a_prblm: !step3Data?.allergic,
    });
  }, [step3Data]);

  function toggleDiabetes(id) {
    switch (id) {
      case 1:
        handleChange({d_prblm: true, no_d_prblm: false});
        break;
      case 2:
        handleChange({d_prblm: false, no_d_prblm: true});
        break;
    }
  }

  function alergics(id) {
    switch (id) {
      case 1:
        handleChange({a_prblm: true, no_a_prblm: false});
        break;
      case 2:
        handleChange({a_prblm: false, no_a_prblm: true});
        break;
    }
  }

  function validation() {
   
      if (formState.a_prblm && formState.allergic_medication_list != '') {
        apiCall();
      } else {
        if (!formState.a_prblm) {
          apiCall();
        } else {
          displayError();
        }
      }
  }

  function displayError() {
    if (!formState.a_prblm && !formState.no_a_prblm) {
      handleChange({ a_e: true });
    } else {
      handleChange({ a_e: false });
    }
    if (!formState.d_prblm && !formState.no_d_prblm) {
      handleChange({ d_e: true });
    } else {
      handleChange({ d_e: false });
    }
    if (!formState.heart_prblm && !formState.no_heart_prblm) {
      handleChange({ h_e: true });
    } else {
      handleChange({ h_e: false });
    }
    if (formState.a_prblm && formState.allergic_medication_list == "") {
      handleChange({ at_e: true });
    } else {
      handleChange({ at_e: false });
    }
  }

  function apiCall() {
    // let jsonbody = {
    //   heart_problems: formState.heart_prblm ? 1 : 0,
    //   diabetes: formState.d_prblm ? 1 : 0,
    //   allergic: formState.a_prblm ? 1 : 0,
    //   id: reg_id,
    // };
    // if (jsonbody.allergic) {
    // jsonbody.allergic_medication_list = formState.allergic_medication_list;
    // }
    // setRedux(clear())
    let payloadData = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
    };

    console.log(formState, 'FOrn isjs  tester');

    const payload = {
      first_name: payloadData?.first_name,
      ic_number: payloadData?.ic_number,
      phone_number: payloadData?.phone_number,
      email: userData?.email,
      dob: payloadData?.dob,
      last_name: payloadData?.last_name,
      race: payloadData?.race,
      gender: payloadData?.male ? 0 : 1,
      nationality: payloadData?.nationality,
      address: payloadData?.address,
      postcode: `${payloadData?.postcode}`,
      city: payloadData?.city,
      state: payloadData?.state,
      is_covered: payloadData?.is_covered,
      address2: payloadData?.address2,
      id: reg_id,
      heart_problems: formState?.heart_prblm,
      diabetes: formState?.d_prblm ? 1 : 0,
      allergic: formState?.a_prblm ? 1 : 0,
      allergic_medication_list: formState?.a_prblm
        ? formState?.allergic_medication_list
        : '',
    };

    console.log(payload, 'update profile payload');

    step4({
      data: payload,
      url: UrlBase.EDITPROFILE,
    });
  }

  return (
    <>
      <ActionBar
        txt={'Edit Profile'}
        onPress={() => {
          navigation.goBack();
        }}></ActionBar>
      {Object.keys(step3Data)?.length > 0 ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            keyboardShouldPersistTaps="handled"
            bounces={true}>
            <View style={{marginHorizontal: '5%'}}>
              <View style={{margin: '5%'}}>
                <SignupTitle txt="Medical information"></SignupTitle>
              </View>
              <View style={{marginTop: '2%'}}>
                <GenderPick
                  error={formState.h_e}
                  variable={'Yes'}
                  variable2={'No'}
                  madatory={true}
                  title={'Do you have any pre-existing heart conditions?'}
                  desc={'Please choose pre-existing heart conditions?'}
                  value={formState.heart_prblm}
                  value2={!formState.heart_prblm}
                  toggle={toggle}></GenderPick>
                <GenderPick
                  error={formState.d_e}
                  variable={'Yes'}
                  variable2={'No'}
                  madatory={true}
                  title={'Do you have Diabetes?'}
                  desc={'Please choose'}
                  value={formState.d_prblm}
                  value2={!formState.d_prblm}
                  toggle={toggleDiabetes}></GenderPick>
                <GenderPick
                  error={formState.a_e}
                  variable={'Yes'}
                  variable2={'No'}
                  madatory={true}
                  title={'Are you allergic to any medication?'}
                  desc={'Please choose'}
                  value={formState.a_prblm}
                  value2={formState.no_a_prblm}
                  toggle={alergics}></GenderPick>
                {formState.a_prblm && (
                  <NameInputBox
                    error={formState.at_e}
                    madatory={true}
                    title={'What medications are you allergic to?'}
                    desc={'Medications you are allergic to'}
                    hint={'Medications you are allergic to'}
                    value={formState.allergic_medication_list}
                    onChangeText={param => {
                      handleChange({allergic_medication_list: param});
                    }}></NameInputBox>
                )}
              </View>
            </View>
          </ScrollView>
          <>
            <View style={{marginHorizontal: '3%'}}>
              <FhLoginButton value={'Save Information'} onPress={validation} />
              <OutlineIcon
                value={'Cancel'}
                onPress={() => {
                  setRedux(clear());
                  navigation.navigate('MyProfile');
                }}
              />
            </View>
          </>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alertcontainer: {marginTop: '10%', marginHorizontal: '5%'},
  logocontainer: {marginTop: '10%'},
  margin_5: {
    marginTop: '5%',
  },
  subtxtcontainer: {
    marginHorizontal: '10%',
  },
});
