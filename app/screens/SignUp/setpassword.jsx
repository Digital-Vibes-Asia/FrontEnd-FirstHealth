import {
  View,
  StyleSheet,
  ScrollView, Alert
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


const minLength = /(?=.{12,15})/;
const uppercase = /(?=.*[A-Z])/;
const lowercase = /(?=.*[a-z])/;
const number = /(?=.*\d)/;
const specialChar = /(?=.*[!@#$%^&*])/;

let regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{12,15}$/;


const SPReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function SetPassword({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const reg_id = useSelector(
    state => state.operation?.temp_regid,
  );

  const temp_data = useSelector(
    state => state.operation?.temp_data,
  );

  console.log(JSON.stringify(temp_data) + " Temp data...")


  const [sp, { data, error }] =
    usePostMutation();


  const [formState, dispatch] = useReducer(SPReducer, {
    mail: temp_data?.mail,
    mail_e: false,
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
      navigation.navigate("mi")
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
            id: reg_id,
            email: formState.mail,
          },
          url: UrlBase.STEP3,
        });

      }

      else {
        handleChange({ setpass_e: true, desc2: "Password does not match", pass_e: false });


      }
    }






  }




  return (
    <>
      <ActionBar txt={"Registration"} progress={3 / 7} onPress={() => {
        navigation.goBack()
      }}></ActionBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}>
        <View style={{ marginHorizontal: "5%" }}>
          <View style={{ marginTop: "5%" }}>
            <StepTxt txt={"STEP 3 of 7"}></StepTxt>
          </View>
          <View style={{ margin: "2%" }}>
            <SignupTitle txt="Create your account"></SignupTitle>
          </View>
          <View style={{ marginVertical: "4%" }}>
            <PassAlert txt={"It is recommended to use a password with at least 12 characters, including a mix of uppercase, lowercase, numbers, and special characters"}></PassAlert>
          </View>
          <View style={{ margin: "2%" }}>
            <MailInputBox error={formState.mail_e}
              madatory={true}
              title={"Email"}
              desc={"Please enter your e-mail address"}
              hint={"Your Mail"}
              value={formState.mail}
              onChangeText={(param) => {
                handleChange({ mail: param });
              }}></MailInputBox>

            <PasswordInputBox madatory={true} error={formState.pass_e}
              title={"Create Password"} desc={formState.desc1}
              hint={"Your password"}
              value={formState.pass}
              eye={formState.eye}
              onPressIn={() => {
                handleChange({ eye: false });

              }}
              onPressOut={() => {
                handleChange({ eye: true });
              }}

              onChangeText={(param) => {
                handleChange({ pass: param });

              }}></PasswordInputBox>
            <PasswordInputBox madatory={true} error={formState.setpass_e} title={"Repeat Password"} desc={formState.desc2} hint={"Your password"} value={formState.setpass}
              eye={formState.eye2}
              onPressIn={() => {
                handleChange({ eye2: false });

              }}
              onPressOut={() => {
                handleChange({ eye2: true });
              }}
              onChangeText={(param) => {
                handleChange({ setpass: param });

              }}></PasswordInputBox>
          </View>

        </View>

      </ScrollView>
      <>
        {!formState.progressBar ?
          <NextFhButton value={"Next, provide medical info"} onPress={() => {
            validation()
          }}></NextFhButton> : <Progressing></Progressing>
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
