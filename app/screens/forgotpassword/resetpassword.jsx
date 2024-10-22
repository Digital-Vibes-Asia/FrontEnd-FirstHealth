import {
  View,
  StyleSheet,
  ScrollView, Alert, Dimensions
} from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ActionBar from '../../common/ActionBar/actionbar';
import StepTxt from '../../common/TittleBox/steptxt';
import SignupTitle from '../../common/TittleBox/signuptitle';
import NextFhButton from '../../common/Button/nextfhbutton';
import PasswordInputBox from '../../common/textinputbox/passwordinputbox';
import PassAlert from '../../common/AlertBox/passalert';
import { UrlBase } from '../../utils/common/urlbase';
import Progressing from '../../common/Progress/Progressing';
import { usePostMutation } from '../../store/api';
import MailInputBox from '../../common/textinputbox/mailinputbox';
import LoginTitle from '../../common/TittleBox/logintitle';
import LockBox from '../../common/AlertBox/lockbox';
import RegisterButton from '../../common/Button/registerbutton';
import FhLoginButton from '../../common/Button/fhloginbutton';
import FhtitleBox from '../../common/TittleBox/fhtitilebox';
import RegistertitleBox from '../../common/TittleBox/registertitilebox';
import BackgorundWave from "../../assets/icon/backgroundwave.svg"
import SmallText from '../../common/TittleBox/smalltext';
import BackHomeButton from '../../common/Button/backhomebutton';
import KeyBox from '../../common/AlertBox/keybox';

const minLength = /(?=.{12,15})/;
const uppercase = /(?=.*[A-Z])/;
const lowercase = /(?=.*[a-z])/;
const number = /(?=.*\d)/;
const specialChar = /(?=.*[!@#$%^&*])/;

let regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{12,15}$/;


const EmReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function ResetPassword({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const { token, email } = route.params;

  console.log(JSON.stringify(route) + " Route...")
  console.log(token, email + " Route...")

  // const reg_id = useSelector(
  //   state => state.operation?.temp_regid,
  // );


  const [sp, { data, error }] =
    usePostMutation();


  const [formState, dispatch] = useReducer(EmReducer, {
    pass: "",
    setpass: "",
    pass_e: false,
    setpass_e: false,
    desc1: "Please enter your password",
    desc2: "Please enter your password",
    progressBar: false,
    eye: true,
    eye2: true,
  });




  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };



  useEffect(() => {
    if (data) {

      navigation.navigate("prs")

    }
    else if (error) {
      console.log(JSON.stringify(error) + " Error...")
      Alert.alert(
        "Alert",
        error?.data?.error,
      );
    }
    handleChange({ progressBar: false });

  }, [data, error]);

  function validation() {

    if (formState.mail == "") {
      handleChange({ mail_e: true });
    }
    else {
      handleChange({ mail_e: false });
    }

    if (!regex.test(formState.pass)) {
      if (!uppercase.test(formState.pass)) {
        handleChange({ pass_e: true, desc1: "Password must include at least one uppercase letter" });
        return
      }
      if (!lowercase.test(formState.pass)) {
        handleChange({ pass_e: true, desc1: "Password must include at least one lowercase letter" });
        return
      }
      if (!number.test(formState.pass)) {
        handleChange({ pass_e: true, desc1: "Password must include at least one number" });
        return
      }
      if (!specialChar.test(formState.pass)) {
        handleChange({ pass_e: true, desc1: "Password must include at least one special character" });
        return
      }

      if (!minLength.test(formState.pass)) {
        handleChange({ pass_e: true, desc1: "Password must be at least 12 characters long" });
        return
      }

    }
    else {
      if (formState.mail != "" && formState.pass == formState.setpass) {
        handleChange({ setpass_e: false, progressBar: true });




        sp({
          data: {
            password: formState.pass,
            token: token,
            email: email,
          },
          url: UrlBase.RESET_PASSWORD,
        });

      }

      else {
        handleChange({ setpass_e: true, desc2: "Password does not match", pass_e: false });


      }
    }






  }




  return (
    <>
      <View style={{ height: Dimensions.get('window').height }}>
        <ActionBar txt={"Reset password"} onPress={() => {
          navigation.goBack()
        }}></ActionBar>

        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          bounces={true}>
          <View style={{ marginHorizontal: "5%" }}>

            <View style={{ marginTop: "30%", alignSelf: "center" }}>
              <KeyBox></KeyBox>
            </View>

            <View style={{ marginTop: "5%", alignSelf: "center" }}>
              <LoginTitle txt="Reset your password"></LoginTitle>

            </View>


            <View style={{ marginVertical: "10%" }}>
              <PasswordInputBox madatory={true} error={formState.pass_e} title={"Create Password"} desc={formState.desc1} hint={"Your password"} value={formState.pass}
                eye={formState.eye}
                onPressIn={() => {
                  handleChange({ eye: false });

                }}
                onPressOut={() => {
                  handleChange({ eye: true });
                }}

                onChangeText={(param) => {
                  handleChange({ pass: param });

                }}

              ></PasswordInputBox>
              <PasswordInputBox madatory={true} error={formState.setpass_e} title={"Repeat Password"} desc={formState.desc2} hint={"Repeat password"} value={formState.setpass} eye={formState.eye2}
                onPressIn={() => {
                  handleChange({ eye2: false });

                }}
                onPressOut={() => {
                  handleChange({ eye2: true });
                }}

                onChangeText={(param) => {
                  handleChange({ setpass: param });

                }}></PasswordInputBox>

              <View style={{ marginTop: "8%" }}>
                <FhLoginButton value={"Reset Password"} onPress={() => {
                  validation()
                  // navigation.navigate("pi")
                }}></FhLoginButton>
              </View>


            </View>
          </View>
        </ScrollView>
        <BackgorundWave width={"100%"} height={"20%"} ></BackgorundWave>
      </View>

      {/* <>
      
        {!formState.progressBar ?
          <NextFhButton value={"Next, provide medical info"} onPress={() => {
            validation()
          }}></NextFhButton> : <Progressing></Progressing>
        }
      </> */}
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
