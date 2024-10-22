import {
  View,
  StyleSheet,
  ScrollView,
  Pressable

} from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import SigninButton from '../../../common/Button/signinbutton';
import MailSuccessTxt from '../../../common/TittleBox/mailsuccesstxt';
import { useSelector } from 'react-redux';
import RegisterButton from '../../../common/Button/registerbutton';
import AlertIcon from '../../../common/AlertBox/alerticon';
import AlertText from '../../../common/AlertBox/alerttext';
import AlertMail from '../../../common/AlertBox/alertmail';
import SuccessText from '../../../common/AlertBox/successtxt';
import BackHomeButton from '../../../common/Button/backhomebutton';




const StartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function InviteSuccess({ route }) {
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
          <View style={{ marginTop: "20%" }}>
            <AlertMail></AlertMail>
            <SuccessText txt={"Success!"}></SuccessText>
            <AlertText txt={"Email Sent!"}></AlertText>
          </View>
          <View style={styles.subtxtcontainer}>
            <MailSuccessTxt txt1={"An email invite has been sent to: "} txt2={formState.mail} ></MailSuccessTxt>
          </View>

          <View style={styles.subtxtcontainer}>
            <MailSuccessTxt txt1={"To be added to your membership plan as a dependant, they must sign up for a First Health account using the referral ID "} txt2={route?.params?.refcode} ></MailSuccessTxt>
          </View>
        </View>

      </ScrollView>
      <>
        <View style={{ marginHorizontal: "5%" }}>
          <BackHomeButton value={"Back"} onPress={() => {
            navigation.pop(2)
          }}></BackHomeButton>
        </View>


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
    marginHorizontal: "10%",
    marginTop: "5%",

  }


});
