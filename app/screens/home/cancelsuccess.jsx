import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useEffect, useState, useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import SigninButton from "../../common/Button/signinbutton";
import MailSuccessTxt from "../../common/TittleBox/mailsuccesstxt";
import { useSelector } from "react-redux";
import RegisterButton from "../../common/Button/registerbutton";
import AlertIcon from "../../common/AlertBox/alerticon";
import AlertText from "../../common/AlertBox/alerttext";
import ThemeSuccessText from "../../common/TittleBox/themesuccesstxt";
import SSimpleText from "../../common/TittleBox/ssimpletxt";
import SmallText from "../../common/TittleBox/smalltext";
import { horizontalScale } from "../../utils/common/Metrics";
import BackHomeButton from "../../common/Button/backhomebutton";


const StartReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function CancelSuccess({ route }) {
  const token = useSelector(
    (state) => state.operation.authentication?.access_token
  );

  const navigation = useNavigation();
  const setRedux = useDispatch();

  console.log(JSON.stringify(route) + " route...");

  const mail = useSelector((state) => state.operation?.temp_data?.mail);

  const [formState, dispatch] = useReducer(StartReducer, {
    mail: route?.params?.mail,
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
          <View style={{ marginTop: "30%" }}>
            <AlertIcon></AlertIcon>
          </View>

          <View style={{ marginTop: "2%" }}>
            <SSimpleText
              txt={"Your scheduled ambulance has been cancelled"}
            ></SSimpleText>
          </View>
          <View style={{ marginTop: "2%" }}>
            <SmallText
              txt={"If you wish to schedule a new ambulance,you may call our hotline again."}
            ></SmallText>
          </View>
        </View>
      </ScrollView>
      <>
        <View style={{marginHorizontal:horizontalScale(10)}}>
          <BackHomeButton value={"Back to Home"} onPress={() => {
            // navigation.goBack()
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
    marginHorizontal: horizontalScale(20),
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
