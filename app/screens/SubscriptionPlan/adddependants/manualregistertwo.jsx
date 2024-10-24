import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useEffect, useState, useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ActionBar from "../../../common/ActionBar/actionbar";
import StepTxt from "../../../common/TittleBox/steptxt";
import SignupTitle from "../../../common/TittleBox/signuptitle";
import NameInputBox from "../../../common/textinputbox/nameinputbox";
import NextFhButton from "../../../common/Button/nextfhbutton";
import { usePostMutation } from "../../../store/api";
import Progressing from "../../../common/Progress/Progressing";
import { UrlBase } from "../../../utils/common/urlbase";
import GenderPick from "../../../common/textinputbox/genderpick";
import FhLoginButton from "../../../common/Button/fhloginbutton";
import { horizontalScale, verticalScale } from "../../../utils/common/Metrics";
import AreYouSure from "../../../common/Dialogs/areyousure";
import FhCancelButton from "../../../common/Button/fhcancelbutton";
import moment from "moment";
import { seteditmgavailslot } from "../../../store/value";
import { useGetQuery } from "../../../store/api";

const PIReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function ManualRegisterTwo({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  console.log(JSON.stringify(route) + " Route...")

  const type = useSelector((state) => state.operation?.type);

  const dependant_type = route?.params?.depen_type;

  const select_data = useSelector((state) => state.operation?.select_data);

  const [step4, { data, error }] = usePostMutation();

  useEffect(() => {
    if (data) {
      setRedux(
        seteditmgavailslot({
          id: select_data.Id,
          name: route?.params?.data?.f_name + " " + route?.params?.data?.l_name,
          man_reg: true,
        })
      );
      handleChange({ progressBar: false });
      if (route?.params?.data?.id) {
        navigation.navigate("mansuccess");

      }
      else {

        navigation.pop(3);

      }




    } else if (error) {
      handleChange({ progressBar: false });
      console.log("error", error);
      Alert.alert("Alert", JSON.stringify(error));
    }
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

  const { data: getdata, error: geterror } = route?.params?.data?.id
    ? useGetQuery(UrlBase.DEPENDANT_DETAILS + route?.params?.data?.id)
    : {
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      refetch: () => { },
    };
  // const { data: getdata, error: geterror } = useGetQuery(UrlBase.DEPENDANT_DETAILS + 27)

  useEffect(() => {
    if (getdata) {
      handleChange({
        alergics: getdata?.data?.allergic_medication_list,
        heart_prblm: getdata?.data?.heart_problems == 1,
        no_heart_prblm: getdata?.data?.heart_problems == 0,
        d_prblm: getdata?.data?.diabetes == 1,
        no_d_prblm: getdata?.data?.diabetes == 0,
        a_prblm: getdata?.data?.allergic == 1,
        no_a_prblm: getdata?.data?.allergic == 0,
      });
    }
  }, [getdata, geterror]);

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  function toggle(id) {
    switch (id) {
      case 1:
        handleChange({ heart_prblm: true, no_heart_prblm: false });
        break;
      case 2:
        handleChange({ heart_prblm: false, no_heart_prblm: true });
        break;
    }
  }

  function toggleDiabetes(id) {
    switch (id) {
      case 1:
        handleChange({ d_prblm: true, no_d_prblm: false });
        break;
      case 2:
        handleChange({ d_prblm: false, no_d_prblm: true });
        break;
    }
  }

  function alergics(id) {
    switch (id) {
      case 1:
        handleChange({ a_prblm: true, no_a_prblm: false });
        break;
      case 2:
        handleChange({ a_prblm: false, no_a_prblm: true });
        break;
    }
  }

  function validation() {
    if (
      (formState.a_prblm || formState.no_a_prblm) &&
      (formState.d_prblm || formState.no_d_prblm) &&
      (formState.heart_prblm || formState.no_heart_prblm)
    ) {
      if (formState.a_prblm && formState.alergics != "") {
        apiCall();
      } else {
        if (formState.no_a_prblm) {
          apiCall();
        } else {
          displayError();
        }
      }
    } else {
      displayError();
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
    if (formState.a_prblm && formState.alergics == "") {
      handleChange({ at_e: true });
    } else {
      handleChange({ at_e: false });
    }
  }

  function apiCall() {
    let jsonbody = {
      type_dependant: select_data?.title ? select_data?.title : dependant_type,
      first_name: route?.params?.data?.f_name,
      last_name: route?.params?.data?.l_name,
      ic_number: route?.params?.data?.ic_num + "",
      phone_number: route?.params?.data?.ph_num,
      email: route?.params?.data?.mail,
      dob: moment(route?.params?.data?.dob).format("YYYY-MM-DD"),
      race: route?.params?.data?.race,
      gender: route?.params?.data?.gender ? 0 : 1,
      nationality: route?.params?.data?.nationality,
      heart_problems: formState.heart_prblm ? 1 : 0,
      diabetes: formState.d_prblm ? 1 : 0,
      allergic: formState.a_prblm ? 1 : 0,
      passport_no: route?.params?.data?.ps_num,
      are_u_foreigner: route?.params?.data?.foreigner ? 0 : 1,
    };
    if (formState.a_prblm) {
      jsonbody.allergic_medication_list = formState.alergics;
    }

    if (route?.params?.data?.id) {
      jsonbody.reg_id = route?.params?.data?.id;
    }

    console.log(JSON.stringify(jsonbody) + "JSON object");

    step4({
      data: JSON.stringify(jsonbody),
      url: data?.id
        ? UrlBase.DEPENDANT_DETAILS + data?.id
        : UrlBase.MANUAL_REGISTRATION,
    });
  }

  return (
    <>
      <ActionBar
        txt={"Registration"}
        progress={2 / 2}
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
            <StepTxt txt={"STEP 2 of 2"}></StepTxt>
          </View>
          <View style={{ marginVertical: "2%", marginHorizontal: "5%" }}>
            <SignupTitle txt="Medical information"></SignupTitle>
          </View>
          <View style={{ marginTop: "2%" }}>
            <GenderPick
              error={formState.h_e}
              variable={"Yes"}
              variable2={"No"}
              madatory={true}
              title={
                "Does your dependant have any pre-existing heart conditions?"
              }
              desc={"Please choose pre-existing heart conditions?"}
              value={formState.heart_prblm}
              value2={formState.no_heart_prblm}
              toggle={toggle}
            ></GenderPick>
            <GenderPick
              error={formState.d_e}
              variable={"Yes"}
              variable2={"No"}
              madatory={true}
              title={"Does your dependant have Diabetes?"}
              desc={"Please choose"}
              value={formState.d_prblm}
              value2={formState.no_d_prblm}
              toggle={toggleDiabetes}
            ></GenderPick>
            <GenderPick
              error={formState.a_e}
              variable={"Yes"}
              variable2={"No"}
              madatory={true}
              title={"Is your dependant allergic to any medication?"}
              desc={"Please choose"}
              value={formState.a_prblm}
              value2={formState.no_a_prblm}
              toggle={alergics}
            ></GenderPick>
            {formState.a_prblm && (
              <NameInputBox
                error={formState.at_e}
                madatory={true}
                title={"What medications are your dependant allergic to?"}
                desc={"Medications you are allergic to"}
                hint={"Medications"}
                value={formState?.alergics}
                onChangeText={(param) => {
                  handleChange({ alergics: param });
                }}
              ></NameInputBox>
            )}
          </View>
          {/* <AreYouSure></AreYouSure> */}
        </View>
      </ScrollView>
      <>
        {!formState.progressBar ? (
          <>
            <View style={{ marginHorizontal: horizontalScale(10) }}>
              <FhLoginButton
                value={"Save and add dependant"}
                onPress={() => {
                  // navigation.navigate("pi")
                  validation();
                }}
              ></FhLoginButton>
            </View>
            <View
              style={{
                marginHorizontal: horizontalScale(10),
                marginVertical: verticalScale(10),
              }}
            >
              <FhCancelButton
                value={"Cancel"}
                onPress={() => {
                  navigation.pop(2);
                }}
              ></FhCancelButton>
            </View>
          </>
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
