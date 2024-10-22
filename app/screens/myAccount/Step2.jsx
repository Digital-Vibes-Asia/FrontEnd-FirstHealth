import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useEffect, useState, useReducer, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import ActionBar from "../../common/ActionBar/actionbar";
import StepTxt from "../../common/TittleBox/steptxt";
import SignupTitle from "../../common/TittleBox/signuptitle";
import CheckCoverageButton from "../../common/Button/checkcoveragebutton";
import LabelTitle from "../../common/textbox/labeltitle";
import ErrorInfo from "../../common/textbox/errorinfo";
import FhInputBox from "../../common/textinputbox/fhinputbox";
import FhDropDown from "../../common/DropDown/fhdropdown";
import PincodeState from "../../common/DropDown/pincodestate";
import { useSelector } from "react-redux";
import Progressing from "../../common/Progress/Progressing";
import { UrlBase } from "../../utils/common/urlbase";
import { useGetQuery, usePostMutation } from "../../store/api";
import { settemp_add, step1Red, step2Red, step3Red } from "../../store/value";
import WhDoubleInputBox from "../../common/textinputbox/whdoubleinputbox";
import WhDoubleDD from "../../common/DropDown/whdoubledd";
import NextFhButton from "../../common/Button/nextfhbutton";
import { RetreiveData } from "../../utils/common/UpdateStepData";

const PIReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function UpdateStep2() {
  const navigation = useNavigation();
  const setRedux = useDispatch();
  const reg_id = useSelector((state) => state.operation?.temp_regid);
  const { step2Data, step1Data } = useSelector((state) => state.operation);
  const { data: profileData, error: profileError } = useGetQuery(
    UrlBase.PROFILEVIEW
  );

  const [step2, { data, error }] = usePostMutation();

  const [formState, dispatch] = useReducer(PIReducer, {
    adds1: "",
    adds2: "",
    pin: "",
    city: "",
    state: "Tamil nadu",
    country: "India",
    val_e: false,
    progressBar: false,
    iscovered: true,
  });

  console.log(profileData, "step 2 jsx prof");

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

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  useEffect(() => {
    if (data) {
      // if (formState.iscovered) {
      console.log(formState.pin + " Pin...");

      if (formState.pin == "627857") {
        navigation.navigate("ua");
      } else {
        setRedux(
          settemp_add({
            address: formState,
          })
        );

        navigation.navigate("cb");
      }
    } else if (error) {
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message)
      );
    }
    handleChange({ progressBar: false });
  }, [data, error]);

  useEffect(() => {
    console.log(step2Data, "step 2 data ");
    handleChange({
      adds1: step2Data?.address,
      adds2: step2Data?.address2,
      pin: `${step2Data?.postcode}`,
      city: step2Data?.city,
      // state : step2Data?.state,
      // country : step2Data?.country,
    });
  }, [step2Data]);

  function validation() {
    if (
      formState.adds1 != "" &&
      formState.pin != "" &&
      formState.city != "" &&
      formState.state != "" &&
      formState.country != ""
    ) {
      // handleChange({ progressBar: true });
      // step2({
      //   data: {
      //     address: formState.adds1,
      //     address2: formState.adds2,
      //     postcode: formState.pin,
      //     city: formState.city,
      //     state: formState.state,
      //     id: reg_id,
      //     is_covered: formState.iscovered ? 1 : 0
      //   },
      //   url: UrlBase.STEP2,
      // });
      setRedux(
        step2Red({
          address: formState.adds1,
          address2: formState.adds2,
          postcode: formState.pin,
          city: formState.city,
          state: formState.state,
          id: reg_id,
          is_covered: formState.iscovered ? 1 : 0,
        })
      );
      navigation.navigate("step3");
    } else {
      displayerror();
    }
  }

  function displayerror() {
    if (
      formState.adds1 == "" ||
      formState.pin == "" ||
      formState.city == "" ||
      formState.state == "" ||
      formState.country == ""
    ) {
      handleChange({ val_e: true });
    } else {
      handleChange({ val_e: false });
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
            <SignupTitle txt="Home Address"></SignupTitle>
          </View>
          <View style={{ margin: "2%" }}>
            <LabelTitle title={"Address"} mandatory={true}></LabelTitle>
            <FhInputBox
              hint="Address Line 1"
              value={formState.adds1}
              onChangeText={(txt) => {
                handleChange({ adds1: txt });
              }}
            ></FhInputBox>
            <FhInputBox
              hint="Address Line 2 (optional)"
              value={formState.adds2}
              onChangeText={(txt) => {
                handleChange({ adds2: txt });
              }}
            ></FhInputBox>
            <WhDoubleInputBox
              hint={"Post Code"}
              hint2={"City"}
              value={formState.pin}
              value2={formState.city}
              onChangeText={(param) => {
                handleChange({ pin: param });
              }}
              onChangeText2={(param) => {
                handleChange({ city: param });
              }}
            ></WhDoubleInputBox>
            <WhDoubleDD
              hint={"State"}
              hint2={"Country"}
              value={formState.state}
              value2={formState.country}
              onChangeText={(param) => {
                handleChange({ state: param });
              }}
              onChangeText2={(param) => {
                handleChange({ country: param });
              }}
            ></WhDoubleDD>

            {/* <PincodeState
                hint1={"Pincode"}
                hint2={"City"}
                hint3={"State"}
                value1={formState.pin}
                value2={formState.city}
                value3={formState.state}
                onChangeText1={(param) => {
                  handleChange({ pin: param });
                }}
                onChangeText2={(param) => {
                  handleChange({ city: param });
                }}
                onPress={(param) => {
                  console.log("State Touched")
                }}
              ></PincodeState>
              <FhDropDown hint={"Country"} value={formState.country} onPress={() => {
                console.log("Country Drop Down..")
              }}></FhDropDown> */}

            {formState.val_e && (
              <ErrorInfo
                desc={"Please enter your address"}
                error={formState.val_e}
              ></ErrorInfo>
            )}
          </View>
        </View>
      </ScrollView>
      <>
        {!formState.progressBar ? (
          <NextFhButton
            value={"Next, medical information"}
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
