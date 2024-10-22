import {
  View,
  StyleSheet,
  ScrollView,
  Pressable

} from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import SigninButton from '../../common/Button/signinbutton';
import MailSuccessTxt from '../../common/TittleBox/mailsuccesstxt';
import { useSelector } from 'react-redux';
import RegisterButton from '../../common/Button/registerbutton';
import AlertIcon from '../../common/AlertBox/alerticon';
import AlertText from '../../common/AlertBox/alerttext';
import ThemeSuccessText from '../../common/TittleBox/themesuccesstxt';
import SSimpleText from '../../common/TittleBox/ssimpletxt';
import SmallText from '../../common/TittleBox/smalltext';
import { horizontalScale } from '../../utils/common/Metrics';
import KeyBox from '../../common/AlertBox/keybox';
import LoginTitle from '../../common/TittleBox/logintitle';
import MailBox from '../../common/AlertBox/mailbox';
import BackHomeButton from '../../common/Button/backhomebutton';



const StartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function MailSent({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  console.log(JSON.stringify(route) + " route...")

  const mail = useSelector(
    state => state.operation?.temp_data?.mail,
  );





  const [formState, dispatch] = useReducer(StartReducer, {
    mail: route?.params?.mail


  });

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };



  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}>
        <View style={styles.container}>


          <Pressable style={{ marginTop: "30%" }} onPress={()=>{
            navigation.navigate("rs")
          }}>
            <MailBox></MailBox>
          </Pressable>
          <View style={{ marginTop: "5%", alignSelf: "center" }}>
            <LoginTitle txt="Email Sent!"></LoginTitle>
          </View>

          <View style={{ marginTop: "2%",  }}>
            <MailSuccessTxt txt1={"An email has been sent to "} ></MailSuccessTxt>
            <MailSuccessTxt  txt2={route?.params?.mail}></MailSuccessTxt>
            <MailSuccessTxt  txt3={"Check your inbox and click on the reset link provided to reset your password"}></MailSuccessTxt>
          </View>

        </View>

      </ScrollView>
      <>
      <View style={{ marginHorizontal: "2%" }}>
        <BackHomeButton value={"Back to Login"} onPress={() => {
          navigation.navigate("login")
        }}></BackHomeButton>
        </View>


      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(20)

  },
  alertcontainer: { marginTop: "10%", marginHorizontal: "5%" },
  logocontainer: { marginTop: "10%" },
  margin_5: {
    marginTop: "5%"
  },
  subtxtcontainer: {
    marginHorizontal: "10%",
    marginTop: "5%",

  }


});
