import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useEffect, useState, useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
//   import SigninButton from '../Button/signinbutton';
//   import MailSuccessTxt from '../TittleBox/mailsuccesstxt';
import MailSuccessTxt from "../TittleBox/mailsuccesstxt";
import { useSelector } from "react-redux";
import RegisterButton from "../Button/registerbutton";
import AlertIcon from "../AlertBox/alerticon";
import AlertText from "../AlertBox/alerttext";
import BackHomeButton from "../Button/backhomebutton";
import { moderateScale } from "../../utils/common/Metrics";

const StartReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function SuccessNotification({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  console.log(JSON.stringify(route) + " route...");

  const mail = useSelector((state) => state.operation?.temp_data?.mail);

  const [formState, dispatch] = useReducer(StartReducer, {
    mail,
  });

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}
      >
        <View style={styles.container}>
          <View style={{ marginTop: "50%" }}>
            <AlertIcon></AlertIcon>
            <AlertText txt={"Saved Successfully"}></AlertText>
          </View>

          {/* <View style={styles.subtxtcontainer}>
              <MailSuccessTxt txt1={"Thank you for signing up for notifications. We will notify you at "} txt2={formState.mail} txt3={"once your area is supported."}></MailSuccessTxt>
            </View> */}
        </View>
      </ScrollView>
      <View style={{ padding: moderateScale(12) }}>
        <BackHomeButton
          value={"Back"}
          onPress={() => {
            navigation.navigate("main", {
              screen: "Subscription",
            });
          }}
        ></BackHomeButton>
      </View>
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
    marginTop: "5%",
  },
});
