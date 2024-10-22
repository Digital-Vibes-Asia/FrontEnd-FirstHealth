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



const EmReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function EnterMail({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const reg_id = useSelector(
    state => state.operation?.temp_regid,
  );


  const [sp, { data, error }] =
    usePostMutation();


  const [formState, dispatch] = useReducer(EmReducer, {
    mail: route?.params?.mail,
    mail_e: false,
    desc1: "Please enter your mail",
    progressBar: false,
  });




  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };



  useEffect(() => {
    if (data) {

      navigation.navigate("ms", {
        mail: formState.mail
      })

      console.log(JSON.stringify(data) + "Data was....")
      // navigation.navigate("mi")
    }
    else if (error) {
      console.log(JSON.stringify(error) + "error was....")

      Alert.alert(
        JSON.stringify("Alert"),
        JSON.stringify(error?.data?.error),
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

    if (formState.mail != "") {
      sp({
        data: {
          email: formState.mail,
        },
        url: UrlBase.FORGOT_PASSWORD,
      });


      // navigation.navigate("ms", {
      //   mmail: formState.mail
      // })

    }




  }




  return (
    <>
      <View style={{ height: Dimensions.get('window').height }}>
        <ActionBar txt={"Forgot password"} onPress={() => {
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
              <LoginTitle txt="Forgot your password?"></LoginTitle>

            </View>
            <View style={{ marginTop: "2%", marginHorizontal: "10%" }}>
              <SmallText txt={"We’ll email you instructions on how to reset your password"}></SmallText>
            </View>

            <View style={{ marginVertical: "10%" }}>
              <MailInputBox error={formState.mail_e}
                title={"Email"}
                desc={"Please enter your e-mail address"}
                hint={"Your Email"}
                value={formState.mail}
                onChangeText={(param) => {
                  handleChange({ mail: param });
                }}></MailInputBox>

              <View style={{ marginTop: "8%" }}>
                <FhLoginButton value={"Request password reset"} onPress={() => {
                  validation()
                  // navigation.navigate("pi")
                }}></FhLoginButton>
              </View>
              <BackHomeButton value={"Back to Login"} onPress={() => {
                navigation.goBack()
              }}></BackHomeButton>

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
