import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ActionBar from '../../common/ActionBar/actionbar';
import StepTxt from '../../common/TittleBox/steptxt';
import SignupTitle from '../../common/TittleBox/signuptitle';
import CheckCoverageButton from '../../common/Button/checkcoveragebutton';
import LabelTitle from '../../common/textbox/labeltitle';
import ErrorInfo from '../../common/textbox/errorinfo';
import FhInputBox from '../../common/textinputbox/fhinputbox';
import FhDropDown from '../../common/DropDown/fhdropdown';
import PincodeState from '../../common/DropDown/pincodestate';
import { useSelector } from 'react-redux';
import Progressing from '../../common/Progress/Progressing';
import { UrlBase } from '../../utils/common/urlbase';
import { usePostMutation } from '../../store/api';
import { settemp_add } from '../../store/value';
import WhDoubleInputBox from '../../common/textinputbox/whdoubleinputbox';
import WhDoubleDD from '../../common/DropDown/whdoubledd';




const PIReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function CheckCoverageArea() {
  const navigation = useNavigation();
  const setRedux = useDispatch();
  const reg_id = useSelector(
    state => state.operation?.temp_regid,
  );


  const [step2, { data, error }] =
    usePostMutation();


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

  console.log(formState.iscovered)

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };


  useEffect(() => {
    if (data) {
      // if (formState.iscovered) {
      console.log(formState.pin + " Pin...")

      if (formState.pin == "627857") {

        navigation.navigate("ua")
      }
      else {
        setRedux(settemp_add({
          address: formState,
        }))

        navigation.navigate("cb")

      }

    }
    else if (error) {
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message),
      );
    }
    handleChange({ progressBar: false });

  }, [data, error]);

  function validation() {

    if (formState.adds1 != "" && formState.pin != "" && formState.city != "" && formState.state != "" && formState.country != "") {

      handleChange({ progressBar: true });
      step2({
        data: {
          address: formState.adds1,
          address2: formState.adds2,
          postcode: formState.pin,
          city: formState.city,
          state: formState.state,
          country: formState.country,
          id: reg_id,
          is_covered: formState.iscovered ? 1 : 0
        },
        url: UrlBase.STEP2,
      });
    }
    else {
      displayerror()
    }

  }

  function displayerror() {
    if (formState.adds1 == "" || formState.pin == "" || formState.city == "" || formState.state == "" || formState.country == "") {
      handleChange({ val_e: true });

    }
    else {
      handleChange({ val_e: false });

    }

  }




  return (
    <>
      <ActionBar txt={"Registration"} progress={2 / 7} onPress={() => {
        navigation.goBack()
      }}></ActionBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}>

        <View style={{ marginHorizontal: "5%" }}>
          <View style={{ marginTop: "5%" }}>
            <StepTxt txt={"STEP 2 of 7"}></StepTxt>
          </View>
          <View style={{ margin: "2%" }}>
            <SignupTitle txt="Check Coverage Area"></SignupTitle>
          </View>
          <View style={{ margin: "2%" }}>
            <LabelTitle title={"Address"} mandatory={true}></LabelTitle>
            <FhInputBox hint="Address Line 1" value={formState.adds1}
              editable={true}
              onChangeText={(txt) => {
                handleChange({ adds1: txt });

              }}></FhInputBox>
            <FhInputBox hint="Address Line 2 (optional)" value={formState.adds2}
              editable1={true}
              onChangeText={(txt) => {
                handleChange({ adds2: txt });

              }}></FhInputBox>
            <WhDoubleInputBox
              editable={true}

              hint={"Postcode"}
              hint2={"City"} value={formState.pin}
              value2={formState.city}
              editable1={true}

              onChangeText={(param) => {
                handleChange({ pin: param });
              }}
              onChangeText2={(param) => {
                handleChange({ city: param });
              }}

            ></WhDoubleInputBox>
            <WhDoubleDD
              hint={"State"}

              hint2={"Country"} value={formState.state}
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

            {formState.val_e &&
              <ErrorInfo desc={"Please enter your address"} error={formState.val_e}></ErrorInfo>
            }
          </View>
        </View>

      </ScrollView>
      <>
        {!formState.progressBar ?
          <CheckCoverageButton value={"Check my coverage area"} onPress={() => {
            validation()
          }}></CheckCoverageButton> : <Progressing></Progressing>
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

  }


});
