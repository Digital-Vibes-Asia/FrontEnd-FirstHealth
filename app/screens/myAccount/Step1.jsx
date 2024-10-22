import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
  Text,
} from "react-native";
import { useEffect, useMemo, useReducer, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ActionBar from "../../common/ActionBar/actionbar";
import StepTxt from "../../common/TittleBox/steptxt";
import SignupTitle from "../../common/TittleBox/signuptitle";
import NameInputBox from "../../common/textinputbox/nameinputbox";
import NumberInputBox from "../../common/textinputbox/numberinputbox";
import MailInputBox from "../../common/textinputbox/mailinputbox";
import NextFhButton from "../../common/Button/nextfhbutton";
import FhCallendarBox from "../../common/PickBox/fhcallendarbox";
import FhDatePicker from "../../common/Dialogs/fhdatepicker";
import { useGetQuery, usePostMutation } from "../../store/api";
import moment from "moment";
import { UrlBase } from "../../utils/common/urlbase";
import Progressing from "../../common/Progress/Progressing";
import {
  clearAuth,
  settemp_regid,
  step1Red,
  step2Red,
  step3Red,
} from "../../store/value";
import PincodeState from "../../common/DropDown/pincodestate";
import DoubleInputBox from "../../common/textinputbox/doubleinputbox";
import GenderPick from "../../common/textinputbox/genderpick";
import { RetreiveData } from "../../utils/common/UpdateStepData";
import FhDropDown from "../../common/DropDown/fhdropdown";
import { RaceValue } from "../../utils/common/defaults";
import RaceDropdown from "../../common/Dialogs/Race";
import {
  CustomColors,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import { verticalScale } from "../../utils/common/Metrics";

const PIReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function Step1({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();
  const [race, setRace] = useState(false);
  const [step1, { data, error }] = usePostMutation();

  const { step1Data, step2Data } = useSelector((state) => state.operation);
  const { data: profileData, error: profileError } = useGetQuery(
    UrlBase.PROFILEVIEW
  );
  console.log(step1Data);

  // useEffect(() => {
  //   const getUrlAsync = async () => {
  //     const initialUrl = await Linking.getInitialURL();
  //     console.log(JSON.stringify(initialUrl)+"...initialUrlinitialUrl")
  //   };
  //   getUrlAsync();
  // }, []);

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
      step2Data?.address
    );
  }, [userData, registerData, subscriptionData]);

  const isEdit = useMemo(() => {
    return route?.params?.isEdit;
  }, [route]);

  console.log(isEdit);

  const [formState, dispatch] = useReducer(PIReducer, {
    name: "",
    f_name: "",
    l_name: "",
    ic_num: "",
    race: "",
    dob: "",
    ph_num: "",
    //   mail: "",
    nationality: "",
    name_e: false,
    fn_e: false,
    ln_e: false,
    ic_num_e: false,
    ph_num_e: false,
    //   mail_e: false,
    dob_e: false,
    gender_e: false,
    date_picker: false,
    progressBar: false,
    male: false,
    female: false,
    race_e: false,
    nationality_e: false,
    isOthers: false,
  });

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  useEffect(() => {
    if (data) {
      // setRedux(settemp_regid({
      //   id: data?.id,
      //   temp_data: formState
      // }))
      navigation.navigate("step2");

      //   } else
      //    if (error) {
      //     Alert.alert(
      //       JSON.stringify(error?.status),
      //       JSON.stringify(error?.data?.message),
      //     );
    }
    handleChange({ progressBar: false });
  }, [data, error]);

  useEffect(() => {
    console.log(step1Data, "step1data effed");
    handleChange({
      f_name: step1Data?.first_name,
      l_name: step1Data?.last_name,
      ic_num: step1Data?.ic_number,
      race: step1Data?.race,
      dob: step1Data?.dob,
      ph_num: step1Data?.phone_number,
      nationality: step1Data?.nationality,
      male: step1Data?.male,
      female: step1Data?.female,
      isOthers: step1Data?.isOthers,
    });
  }, [step1Data]);

  function toggle(id) {
    switch (id) {
      case 1:
        handleChange({ male: true, female: false });

        break;
      case 2:
        handleChange({ male: false, female: true });
        break;
    }
  }

  function validation() {
    if (
      formState.f_name != "" &&
      formState.l_name != "" &&
      formState.dob != "" &&
      formState.ic_num != "" &&
      // formState.mail != "" &&
      formState.ph_num != "" &&
      formState.race != "" &&
      formState.nationality != "" &&
      (formState.male || formState.female)
    ) {
      console.log("Validation Checked Successfully");
      // handleChange({ progressBar: true });
      // step1({
      //   data: {
      //     first_name: formState.f_name,
      //     last_name: formState.l_name,
      //     dob: moment(formState.dob).format("YYYY-MM-DD"),
      //     // email: formState.mail,
      //     ic_number: formState.ic_num,
      //     phone_number: formState.ph_num,
      //     race: formState.race,
      //     nationality: formState.nationality,
      //     gender: formState.male ? 0 : 1,

      //   },
      //   url: UrlBase.STEP1,
      // });
      setRedux(
        step1Red({
          //   name: "",
          first_name: formState?.f_name,
          last_name: formState?.l_name,
          ic_number: formState?.ic_num,
          race: formState?.race,
          dob: formState?.dob,
          phone_number: formState?.ph_num,
          nationality: formState?.nationality,
          male: formState?.male,
          female: formState?.female,
          isOthers: formState?.isOthers,
        })
      );
      navigation.navigate("step2");
    } else {
      displayerror();
    }
  }

  function displayerror() {
    if (formState.f_name == "") {
      handleChange({ fn_e: true });
    } else {
      handleChange({ fn_e: false });
    }
    if (formState.l_name == "") {
      handleChange({ ln_e: true });
    } else {
      handleChange({ ln_e: false });
    }
    //   if (formState.mail == "") {
    //     handleChange({ mail_e: true });
    //   }
    //   else {
    //     handleChange({ mail_e: false });
    //   }

    if (formState.ph_num == "") {
      handleChange({ ph_num_e: true });
    } else {
      handleChange({ ph_num_e: false });
    }

    if (formState.ic_num == "") {
      handleChange({ ic_num_e: true });
    } else {
      handleChange({ ic_num_e: false });
    }

    if (formState.dob == "") {
      handleChange({ dob_e: true });
    } else {
      handleChange({ dob_e: false });
    }

    if (!formState.male && !formState.female) {
      handleChange({ gender_e: true });
    } else {
      handleChange({ gender_e: false });
    }

    if (formState.nationality == "") {
      handleChange({ nationality_e: true });
    } else {
      handleChange({ nationality_e: false });
    }

    if (formState.race == "") {
      handleChange({ race_e: true });
    } else {
      handleChange({ race_e: false });
    }
  }

  return (
    <>
      <ActionBar
        txt={"Edit Profile"}
        onPress={() => {
          navigation.goBack();
        }}
      ></ActionBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}
      >
        <View style={{ marginHorizontal: "5%" }}>
          <View style={{ margin: "5%" }}>
            <SignupTitle txt="Personal Information"></SignupTitle>
          </View>
          <View style={{ marginTop: "5%" }}>
            <DoubleInputBox
              error={formState.fn_e}
              error2={formState.ln_e}
              madatory={true}
              madatory2={true}
              title={"First Name"}
              title2={"Last Name"}
              desc={"First name"}
              desc2={"Last name"}
              hint={"First name"}
              hint2={"Last Name"}
              value={formState.f_name}
              value2={formState.l_name}
              onChangeText={(param) => {
                handleChange({ f_name: param });
              }}
              onChangeText2={(param) => {
                handleChange({ l_name: param });
              }}
            ></DoubleInputBox>
            {/* <MailInputBox error={formState.mail_e}
                madatory={true}
                title={"Email"}
                desc={"Please enter your e-mail address"}
                hint={"Your Email"}
                value={formState.mail}
                onChangeText={(param) => {
                  handleChange({ mail: param });
                }}></MailInputBox> */}
            <NumberInputBox
              error={formState.ph_num_e}
              madatory={true}
              title={"Contact No"}
              desc={"Please enter your phone number"}
              hint={"012-3456789"}
              value={formState.ph_num}
              onChangeText={(param) => {
                handleChange({ ph_num: param });
              }}
            ></NumberInputBox>
            <NumberInputBox
              error={formState.ic_num_e}
              madatory={true}
              title={"IC No/Passport No"}
              desc={"Please enter your IC No./Passport No"}
              hint={"Your IC No./Passport No"}
              value={formState.ic_num}
              onChangeText={(param) => {
                handleChange({ ic_num: param });
              }}
            ></NumberInputBox>
            <FhCallendarBox
              error={formState.dob_e}
              madatory={true}
              title={"Date of birth"}
              hint={"Your Date of Birth"}
              value={formState.dob}
              desc={"Please enter your dob"}
              onPress={() => {
                handleChange({ date_picker: true });
              }}
            ></FhCallendarBox>

            {/* <NameInputBox
              error={formState.race_e}
              madatory={true}
              title={"Race"}
              desc={"Please enter your Race"}
              hint={"Your Race"}
              value={formState.race}
              onChangeText={(param) => {
                handleChange({ race: param });
              }}
            ></NameInputBox> */}

            {formState.isOthers ? (
              <NameInputBox
                error={formState.race_e}
                madatory={true}
                title={"Race"}
                desc={"Please enter your Race"}
                hint={"Your Race"}
                value={formState.race == "others" ? "" :  formState.race}
                onChangeText={(param) => {
                  handleChange({ race: param, isOthers: true });
                }}
              ></NameInputBox>
            ) : (
              <Text style={styles.titletxt}>Race <Text style={[styles.titletxt, { color: CustomColors.error_red }]}>*</Text> </Text>

            )}
            
            <FhDropDown
              hint={"Country"}
              value={
                RaceValue.some((ele) => ele.value == formState?.race)
                  ? formState.race
                  : formState.isOthers ? "Others" : "race"
              }
              onPress={() => setRace(true)}
            ></FhDropDown>

            <GenderPick
              error={formState.gender_e}
              variable={"Male"}
              variable2={"Female"}
              madatory={true}
              title={"Gender"}
              desc={"Please choose gender"}
              value={formState.male}
              value2={formState.female}
              toggle={toggle}
            ></GenderPick>
            <NameInputBox
              error={formState.nationality_e}
              madatory={true}
              title={"Nationality"}
              desc={"Please enter your nationality"}
              hint={"Your Nationality"}
              value={formState.nationality}
              onChangeText={(param) => {
                handleChange({ nationality: param });
              }}
            ></NameInputBox>
          </View>
        </View>
        {formState.date_picker && (
          <FhDatePicker
            dialogStatus={formState.date_picker}
            date={formState.dob}
            close={() => {
              handleChange({ date_picker: false });
            }}
            setdialogStatus={(data) => {
              handleChange({ dob: data.toString(), date_picker: false });
            }}
          ></FhDatePicker>
        )}
      </ScrollView>
      <RaceDropdown
        modalVisible={race}
        setModalVisible={setRace}
        handleChange={handleChange}
        formState={formState}
      />
      <>
        {!formState.progressBar ? (
          <NextFhButton
            value={"Next, home address"}
            onPress={() => {
              validation();
            }}
          ></NextFhButton>
        ) : (
          <Progressing></Progressing>
        )}
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
    marginTop: "5%",
  },
  subtxtcontainer: {
    marginHorizontal: "10%",
  },
  titletxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    marginBottom: verticalScale(5),
    lineHeight: verticalScale(18),
  },
});
