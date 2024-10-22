import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
  Text
} from 'react-native';
import { useEffect, useReducer, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ActionBar from '../../common/ActionBar/actionbar';
import StepTxt from '../../common/TittleBox/steptxt';
import SignupTitle from '../../common/TittleBox/signuptitle';
import NameInputBox from '../../common/textinputbox/nameinputbox';
import NumberInputBox from '../../common/textinputbox/numberinputbox';
import MailInputBox from '../../common/textinputbox/mailinputbox';
import NextFhButton from '../../common/Button/nextfhbutton';
import FhCallendarBox from '../../common/PickBox/fhcallendarbox';
import FhDatePicker from '../../common/Dialogs/fhdatepicker';
import { usePostMutation } from '../../store/api';
import moment from 'moment';
import { UrlBase } from '../../utils/common/urlbase';
import Progressing from '../../common/Progress/Progressing';
import { settemp_regid } from '../../store/value';
import PincodeState from '../../common/DropDown/pincodestate';
import DoubleInputBox from '../../common/textinputbox/doubleinputbox';
import GenderPick from '../../common/textinputbox/genderpick';
import FhDropDown from '../../common/DropDown/fhdropdown';
import RaceDropdown from '../../common/Dialogs/Race';
import { RaceValue } from '../../utils/common/defaults';
import { CustomColors, CustomFonts, CustomFontSize } from '../../utils/common/CustomStyles';
import { verticalScale } from '../../utils/common/Metrics';



const PIReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function PersonalInfoForm() {
  const navigation = useNavigation();
  const setRedux = useDispatch();
  const [race, setRace] = useState(false)

  const [step1, { data, error }] =
    usePostMutation();

  // useEffect(() => {
  //   const getUrlAsync = async () => {

  //     const initialUrl = await Linking.getInitialURL();

  //     console.log(JSON.stringify(initialUrl)+"...initialUrlinitialUrl")



  //   };

  //   getUrlAsync();
  // }, []);





  const [formState, dispatch] = useReducer(PIReducer, {
    name: "",
    f_name: "",
    l_name: "",
    ic_num: "",
    ps_num: "",
    race: "",
    dob: "",
    ph_num: "",
    mail: "",
    nationality: "",
    name_e: false,
    fn_e: false,
    ln_e: false,
    ic_num_e: false,
    ps_num_e: false,
    ph_num_e: false,
    mail_e: false,
    dob_e: false,
    gender_e: false,
    foreigner_e: false,
    date_picker: false,
    progressBar: false,
    male: false,
    female: false,
    foreigner: false,
    non_foreigner: false,
    race_e: false,
    nationality_e: false,
    isOthers: false
  });

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };

  useEffect(() => {
    if (data) {
      setRedux(settemp_regid({
        id: data?.id,
        temp_data: formState
      }))
      // navigation.navigate("cb")
      navigation.navigate("add")


    }
    else if (error) {
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message),
      );
    }
    handleChange({ progressBar: false });

  }, [data, error]);


  function toggle(id) {
    switch (id) {
      case 1:
        handleChange({ male: true, female: false });
        break
      case 2:
        handleChange({ male: false, female: true });
        break
    }

  }

  function f_toggle(id) {
    switch (id) {
      case 1:
        handleChange({ foreigner: true, non_foreigner: false });
        break
      case 2:
        handleChange({ foreigner: false, non_foreigner: true });
        break
    }

  }




  function validation() {

    console.log("Validation Started")

    if (formState.f_name != "" && formState.l_name != "" &&
      formState.dob != "" &&
      formState.mail != "" && formState.ph_num != "" && formState.race != ""
      && formState.nationality != "" && (formState.male || formState.female)
    ) {
      console.log("Validation Checked Successfully")


      if (formState.non_foreigner && formState.ic_num == "") {
        handleChange({ ic_num_e: true });
        return
      }
      else {
        handleChange({ ic_num_e: false });
      }


      if (formState.foreigner && formState.ps_num.length < 6) {
        handleChange({ ps_num_e: true });
        return
      }
      else {
        handleChange({ ps_num_e: false });

      }



      handleChange({ progressBar: true });

      step1({
        data: {
          first_name: formState.f_name,
          last_name: formState.l_name,
          ic_number: formState.ic_num,
          dob: moment(formState.dob).format("YYYY-MM-DD"),
          email: formState.mail,
          phone_number: formState.ph_num,
          race: formState.race,
          nationality: formState.nationality,
          gender: formState.male ? 0 : 1,
          are_u_foreigner:formState.foreigner ? 0 : 1,
          // isOthers: formState.isOthers,
          passport_no:formState.ps_num,

        },
        url: UrlBase.STEP1,
      });
    }
    else {
      displayerror()
    }
  }

  function displayerror() {
    if (formState.f_name == "") {
      handleChange({ fn_e: true });
    }
    else {
      handleChange({ fn_e: false });
    }
    if (formState.l_name == "") {
      handleChange({ ln_e: true });
    }
    else {
      handleChange({ ln_e: false });
    }
    if (formState.mail == "") {
      handleChange({ mail_e: true });
    }
    else {
      handleChange({ mail_e: false });
    }

    if (formState.ph_num == "") {
      handleChange({ ph_num_e: true });
    }
    else {
      handleChange({ ph_num_e: false });
    }





    if (formState.dob == "") {
      handleChange({ dob_e: true });
    }
    else {
      handleChange({ dob_e: false });
    }
    if (!formState.foreigner && !formState.non_foreigner) {
      handleChange({ foreigner_e: true });
    }

    // if (formState.foreigner && formState.ps_num == "") {
    //   handleChange({ ps_num_e: true });
    // }
    // else {
    //   handleChange({ ps_num_e: false });
    // }

    if (!formState.male && !formState.female) {
      handleChange({ gender_e: true });
    }
    else {
      handleChange({ gender_e: false });
    }

    if (formState.nationality == "") {
      handleChange({ nationality_e: true });
    }
    else {
      handleChange({ nationality_e: false });
    }

    if (formState.race == "") {
      handleChange({ race_e: true });
    }
    else {
      handleChange({ race_e: false });
    }

  }




  return (
    <>
      <ActionBar txt={"Registration"} progress={1 / 7} onPress={() => {
        navigation.goBack()
      }}></ActionBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}>

        <View style={{ marginHorizontal: "5%" }}>
          <View style={{ marginTop: "5%" }}>
            <StepTxt txt={"STEP 1 of 7"}></StepTxt>
          </View>
          <View style={{ margin: "2%" }}>
            <SignupTitle txt="Personal Information"></SignupTitle>
          </View>
          <View style={{ marginTop: "5%" }}>

            <DoubleInputBox error={formState.fn_e}
              error2={formState.ln_e}
              madatory={true} madatory2={true}
              title={"First Name"}
              title2={"Last Name"} desc={"First name"}
              desc2={"Last name"} hint={"First name"}
              hint2={"Last Name"} value={formState.f_name}
              value2={formState.l_name}
              onChangeText={(param) => {
                handleChange({ f_name: param });
              }}
              onChangeText2={(param) => {
                handleChange({ l_name: param });
              }}

            ></DoubleInputBox>
            <MailInputBox error={formState.mail_e}
              madatory={true}
              title={"Email"}
              desc={"Please enter your e-mail address"}
              hint={"Your Email"}
              value={formState.mail}
              onChangeText={(param) => {
                handleChange({ mail: param });
              }}></MailInputBox>
            <NumberInputBox error={formState.ph_num_e}
              madatory={true}
              title={"Contact No"} desc={"Please enter your phone number"}
              hint={"012-3456789"} value={formState.ph_num}
              onChangeText={(param) => {
                handleChange({ ph_num: param });

              }}></NumberInputBox>
            <GenderPick error={formState.foreigner_e}
              variable={"Yes"}
              variable2={"No"}
              madatory={true} title={"Are you a foreigner?"}
              desc={"Please choose"}
              value={formState.foreigner} value2={formState.non_foreigner}
              toggle={f_toggle}></GenderPick>
            {formState?.non_foreigner &&
              <NumberInputBox error={formState.ic_num_e}
                madatory={true}
                maxlen={12}
                title={"IC No."}
                desc={"Please enter your IC No"}
                hint={"Your IC No"} value={formState.ic_num}
                onChangeText={(param) => {
                  handleChange({ ic_num: param });
                }}></NumberInputBox>
            }
            {formState?.foreigner &&
              < NameInputBox error={formState.ps_num_e}
                madatory={true}
                title={"Passport No."}
                desc={"Please enter your valid Passport No."}
                hint={"Your Passport No."} value={formState.ps_num}
                onChangeText={(param) => {
                  handleChange({ ps_num: param });
                }}></NameInputBox>
            }




            <FhCallendarBox error={formState.dob_e}
              madatory={true}
              title={'Date of birth'} hint={"Your Date of Birth"}
              value={formState.dob}
              desc={"Please enter your dob"}
              onPress={() => {
                handleChange({ date_picker: true })
              }}></FhCallendarBox>

            {
              formState.isOthers ?

                <NameInputBox error={formState.race_e}
                  madatory={true} title={"Race"}
                  desc={"Please enter your Race"} hint={"Your Race"}
                  value={formState.race == "others" ? "" : formState.race} onChangeText={(param) => {
                    handleChange({ race: param, isOthers: true });
                  }}></NameInputBox>
                : <>
                  <Text style={styles.titletxt}>Race </Text>
                </>
            }
            <FhDropDown
              hint={"Country"}
              value={
                RaceValue.some((ele) => ele.value == formState?.race)
                  ? formState.race
                  : formState.isOthers ? "Others" : "race"
              }
              onPress={() => setRace(true)}
            ></FhDropDown>
            <GenderPick error={formState.gender_e}
              variable={"Male"}
              variable2={"Female"}
              madatory={true} title={"Gender"}
              desc={"Please choose gender"}
              value={formState.male} value2={formState.female}
              toggle={toggle}></GenderPick>
            <NameInputBox error={formState.nationality_e}
              madatory={true} title={"Nationality"}
              desc={"Please enter your nationality"} hint={"Your Nationality"}
              value={formState.nationality} onChangeText={(param) => {
                handleChange({ nationality: param });
              }}></NameInputBox>

          </View>

        </View>
        {formState.date_picker &&
          <FhDatePicker
            dialogStatus={formState.date_picker}
            date={formState.dob}
            close={() => {
              handleChange({ date_picker: false })
            }}
            setdialogStatus={(data) => {
              handleChange({ dob: data.toString(), date_picker: false })
            }}></FhDatePicker>
        }

      </ScrollView >
      <RaceDropdown modalVisible={race} setModalVisible={setRace} handleChange={handleChange} formState={formState} />
      <>
        {!formState.progressBar ?
          <NextFhButton value={"Next, check coverage area"} onPress={() => {
            validation()
          }}></NextFhButton>
          :
          <Progressing></Progressing>

        }
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

  },
  titletxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    marginBottom: verticalScale(5),
    lineHeight: verticalScale(18),
  },

});
