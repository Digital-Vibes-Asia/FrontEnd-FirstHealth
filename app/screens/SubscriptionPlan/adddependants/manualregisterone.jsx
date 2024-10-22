import { View, StyleSheet, ScrollView, Alert, Linking } from "react-native";
import { useEffect, useReducer, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import ActionBar from "../../../common/ActionBar/actionbar";
import StepTxt from "../../../common/TittleBox/steptxt";
import SignupTitle from "../../../common/TittleBox/signuptitle";
import NameInputBox from "../../../common/textinputbox/nameinputbox";
import NumberInputBox from "../../../common/textinputbox/numberinputbox";
import MailInputBox from "../../../common/textinputbox/mailinputbox";
import NextFhButton from "../../../common/Button/nextfhbutton";
import FhCallendarBox from "../../../common/PickBox/fhcallendarbox";
import FhDatePicker from "../../../common/Dialogs/fhdatepicker";
import { usePostMutation, useGetQuery } from "../../../store/api";
import { UrlBase } from "../../../utils/common/urlbase";
import Progressing from "../../../common/Progress/Progressing";
import { settemp_regid } from "../../../store/value";
import PincodeState from "../../../common/DropDown/pincodestate";
import DoubleInputBox from "../../../common/textinputbox/doubleinputbox";
import GenderPick from "../../../common/textinputbox/genderpick";
import moment from "moment";
import { RaceValue } from "../../../utils/common/defaults";
import { Text } from "react-native";
import { CustomColors } from "../../../utils/common/CustomStyles";
import FhDropDown from "../../../common/DropDown/fhdropdown";
import RaceDropdown from "../../../common/Dialogs/Race";

const PIReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function ManualRegisterOne({ route }) {
  const [race,setRace] = useState(false)
  const reg_id = route?.params?.id;
  const type = route?.params?.type;
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const { data, error, refetch } = route?.params?.id
    ? useGetQuery(UrlBase.DEPENDANT_DETAILS + route?.params?.id)
    : {
        data: null,
        error: null,
        isLoading: false,
        isSuccess: false,
        refetch: () => {},
      };
  // const { data, error, refetch } = useGetQuery(UrlBase.DEPENDANT_DETAILS + reg_id);

  useEffect(() => {
    if (data) {
      handleChange({
        f_name: data?.data?.first_name,
        l_name: data?.data?.last_name,
        ic_num: data?.data?.ic_number,
        race: data?.data?.race,
        dob: data?.data?.dob,
        ph_num: data?.data?.phone_number,
        mail: data?.data?.email,
        nationality: data?.data?.nationality,
        male: data?.data?.gender == 0,
        female: data?.data?.gender == 1,
        isOthers: !RaceValue.some((ele) => ele.value == (data?.data?.race)),
      });
    }
  }, [data, error]);

  const [formState, dispatch] = useReducer(PIReducer, {
    id: reg_id,
    f_name: "",
    l_name: "",
    ic_num: "",
    race: "",
    dob: "",
    ph_num: "",
    mail: "",
    nationality: "",
    name_e: false,
    fn_e: false,
    ln_e: false,
    ic_num_e: false,
    ph_num_e: false,
    mail_e: false,
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

  // useEffect(() => {
  //   if (data) {
  //     handleChange({ progressBar: false });
  //     setRedux(settemp_regid({
  //       id: data?.id,
  //       temp_data: formState
  //     }))
  //     navigation.navigate("cca")

  //   }
  //   else if (error) {
  //     handleChange({ progressBar: false });
  //     Alert.alert(
  //       JSON.stringify(error?.status),
  //       JSON.stringify(error?.data?.message),
  //     );
  //   }

  // }, [data, error]);

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
      formState.mail != "" &&
      formState.ph_num != "" &&
      formState.race != "" &&
      formState.nationality != "" &&
      (formState.male || formState.female)
    ) {
      // handleChange({ progressBar: true });
      navigation.navigate("mrtwo", {
        data: formState,
        depen_type: type,
      });

      // step1({
      //   data: {
      //     first_name: formState.f_name,
      //     last_name: formState.l_name,
      //     dob: moment(formState.dob).format("YYYY-MM-DD"),
      //     email: formState.mail,
      //     ic_number: formState.ic_num,
      //     phone_number: formState.ph_num,
      //     race: formState.race,
      //     nationality: formState.nationality,
      //     gender: formState.male ? 0 : 1,

      //   },
      //   url: UrlBase.STEP1,
      // });
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
    if (formState.mail == "") {
      handleChange({ mail_e: true });
    } else {
      handleChange({ mail_e: false });
    }

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
        txt={"Registration"}
        progress={1 / 2}
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
          <View style={{ marginTop: "5%" }}>
            <StepTxt txt={"STEP 1 of 2"}></StepTxt>
          </View>
          <View style={{ margin: "2%" }}>
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
            <MailInputBox
              error={formState.mail_e}
              madatory={true}
              title={"Email"}
              desc={"Please enter your e-mail address"}
              hint={"Your Email"}
              value={formState.mail}
              onChangeText={(param) => {
                handleChange({ mail: param });
              }}
            ></MailInputBox>
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
              value={formState.ic_num + ""}
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
            value={"Next, Medical Information"}
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
});