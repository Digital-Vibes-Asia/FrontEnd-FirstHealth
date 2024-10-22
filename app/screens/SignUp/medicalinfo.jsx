import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ActionBar from '../../common/ActionBar/actionbar';
import StepTxt from '../../common/TittleBox/steptxt';
import SignupTitle from '../../common/TittleBox/signuptitle';
import NameInputBox from '../../common/textinputbox/nameinputbox';
import NextFhButton from '../../common/Button/nextfhbutton';
import { usePostMutation } from '../../store/api';
import Progressing from '../../common/Progress/Progressing';
import { UrlBase } from '../../utils/common/urlbase';
import GenderPick from '../../common/textinputbox/genderpick';



const PIReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function MedicalInfo() {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const reg_id = useSelector(
    state => state.operation?.temp_regid,
  );

  const [step4, { data, error }] =
    usePostMutation();


  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data) + " Data is here..")
      navigation.navigate("rn")
    }
    else if (error) {
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message),
      );
    }
    handleChange({ progressBar: false });

  }, [data, error]);


  const [formState, dispatch] = useReducer(PIReducer, {
    alergics: "",
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
    dispatch({ type: 'SET_FIELD', fields });
  };

  function toggle(id) {
    switch (id) {
      case 1:
        handleChange({ heart_prblm: true, no_heart_prblm: false });
        break
      case 2:
        handleChange({ heart_prblm: false, no_heart_prblm: true });
        break
    }
  }

  function toggleDiabetes(id) {
    switch (id) {
      case 1:
        handleChange({ d_prblm: true, no_d_prblm: false });
        break
      case 2:
        handleChange({ d_prblm: false, no_d_prblm: true });
        break
    }
  }

  function alergics(id) {
    switch (id) {
      case 1:
        handleChange({ a_prblm: true, no_a_prblm: false });
        break
      case 2:
        handleChange({ a_prblm: false, no_a_prblm: true });
        break
    }
  }

  function validation() {

    if ((formState.a_prblm || formState.no_a_prblm) && (formState.d_prblm || formState.no_d_prblm) && (formState.heart_prblm || formState.no_heart_prblm)) {
      if (formState.a_prblm && formState.alergics != "") {
        apiCall()
      }
      else {
        if (formState.no_a_prblm) {
          apiCall()
        }
        else {
          displayError()

        }

      }
    }
    else {
      displayError()
    }



  }

  function displayError() {
    if (!formState.a_prblm && !formState.no_a_prblm) {
      handleChange({ a_e: true });
    }
    else {
      handleChange({ a_e: false });
    }
    if (!formState.d_prblm && !formState.no_d_prblm) {
      handleChange({ d_e: true });
    }
    else {
      handleChange({ d_e: false });
    }
    if (!formState.heart_prblm && !formState.no_heart_prblm) {
      handleChange({ h_e: true });
    }
    else {
      handleChange({ h_e: false });
    }
    if (formState.a_prblm && formState.alergics == "") {
      handleChange({ at_e: true });
    }
    else {
      handleChange({ at_e: false });
    }



  }

  function apiCall() {
    let jsonbody = {
      heart_problems: formState.heart_prblm ? 1 : 0,
      diabetes: formState.d_prblm ? 1 : 0,
      allergic: formState.a_prblm ? 1 : 0,
      id: reg_id,
    }
    // if (formState.alergics) {
    jsonbody.allergic_medication_list = formState.alergics
    // }


    step4({
      data:
        jsonbody
      ,
      url: UrlBase.STEP4,
    });
  }




  return (
    <>
      <ActionBar txt={"Registration"} progress={4 / 7} onPress={() => {
        navigation.goBack()
      }}></ActionBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}>

        <View style={{ marginHorizontal: "5%" }}>
          <View style={{ marginTop: "5%" }}>
            <StepTxt txt={"STEP 4 of 7"}></StepTxt>
          </View>
          <View style={{ marginVertical: "2%", marginHorizontal: "5%" }}>
            <SignupTitle txt="Provide your medical information"></SignupTitle>
          </View>
          <View style={{ marginTop: "2%" }}>

            <GenderPick error={formState.h_e}
              variable={"Yes"}
              variable2={"No"}
              madatory={true} title={"Do you have any pre-existing heart conditions?"}
              desc={"Please choose pre-existing heart conditions?"}
              value={formState.heart_prblm} value2={formState.no_heart_prblm}
              toggle={toggle}></GenderPick>
            <GenderPick error={formState.d_e}
              variable={"Yes"}
              variable2={"No"}
              madatory={true} title={"Do you have Diabetes?"}
              desc={"Please choose"}
              value={formState.d_prblm} value2={formState.no_d_prblm}
              toggle={toggleDiabetes}></GenderPick>
            <GenderPick error={formState.a_e}
              variable={"Yes"}
              variable2={"No"}
              madatory={true} title={"Are you allergic to any medication?"}
              desc={"Please choose"}
              value={formState.a_prblm} value2={formState.no_a_prblm}
              toggle={alergics}></GenderPick>
            {formState.a_prblm &&
              <NameInputBox error={formState.at_e}
                madatory={true} title={"What medications are you allergic to?"}
                desc={"Medications you are allergic to"} hint={"Medications you are allergic to"}
                value={formState.alergics} onChangeText={(param) => {
                  handleChange({ alergics: param });
                }}></NameInputBox>
            }
          </View>

        </View>

      </ScrollView>
      <>
        {!formState.progressBar ?
          <NextFhButton value={"Next, referral number"} onPress={() => {
            validation()
          }}></NextFhButton>
          : <Progressing></Progressing>}
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alertcontainer: { marginTop: "10%", marginHorizontal: "5%" },
  logocontainer: { marginTop: "10%" },
  margin_5: {
    marginTop: "5%"
  },
  subtxtcontainer: {
    marginHorizontal: "10%"

  }


});
