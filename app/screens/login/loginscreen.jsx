import { View, StyleSheet, ScrollView, Alert, Dimensions, Image } from "react-native";
import { useEffect, useState, useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ActionBar from "../../common/ActionBar/actionbar";
import StepTxt from "../../common/TittleBox/steptxt";
import SignupTitle from "../../common/TittleBox/signuptitle";
import NextFhButton from "../../common/Button/nextfhbutton";
import PasswordInputBox from "../../common/textinputbox/passwordinputbox";
import PassAlert from "../../common/AlertBox/passalert";
import { UrlBase } from "../../utils/common/urlbase";
import Progressing from "../../common/Progress/Progressing";
import { usePostMutation } from "../../store/api";
import MailInputBox from "../../common/textinputbox/mailinputbox";
import LoginTitle from "../../common/TittleBox/logintitle";
import LockBox from "../../common/AlertBox/lockbox";
import RegisterButton from "../../common/Button/registerbutton";
import FhLoginButton from "../../common/Button/fhloginbutton";
import FhtitleBox from "../../common/TittleBox/fhtitilebox";
import RegistertitleBox from "../../common/TittleBox/registertitilebox";
import BackgorundWave from "../../assets/icon/backgroundwave.svg";
import {
  setAuthentication,
  settemp_regid,
  setUsername,
} from "../../store/value";
import { CustomDimensions } from "../../utils/common/CustomStyles";

const minLength = /(?=.{12,15})/;
const uppercase = /(?=.*[A-Z])/;
const lowercase = /(?=.*[a-z])/;
const number = /(?=.*\d)/;
const specialChar = /(?=.*[!@#$%^&*])/;

let regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{12,15}$/;

const SPReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function LoginScreen({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const reg_id = useSelector((state) => state.operation?.temp_regid);
  const fcm_token = useSelector((state) => state.operation.fcm_token);

  const [sp, { data, error }] = usePostMutation();

  const [formState, dispatch] = useReducer(SPReducer, {
    mail: "",
    mail_e: false,
    pass: "",
    setpass: "",
    pass_e: false,
    setpass_e: false,
    desc1: "Please enter your password",
    desc2: "Please enter your password",
    progressBar: false,
    eye: true,
  });

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data) + " Data Json...");
      setRedux(setUsername(data?.user?.name));
      setRedux(
        setAuthentication({
          userdata: data,
        })
      );
      setRedux(settemp_regid({ id: data?.user?.reg_id }));

      // console.log(data)
    } else if (error) {
      console.log(error);
      Alert.alert(JSON.stringify(error?.status), error?.data?.error);
    }
    handleChange({ progressBar: false });
  }, [data, error]);

  function validation() {
    if (formState.mail == "") {
      handleChange({ mail_e: true });
    } else {
      handleChange({ mail_e: false });
    }

    if (formState.pass == "") {
      handleChange({ pass_e: true });
    } else {
      handleChange({ pass_e: false });
    }

    if (formState.mail != "" && formState.pass != "") {
      handleChange({ progressBar: true });
      sp({
        data: {
          password: formState.pass,
          // id: reg_id,
          email: formState.mail,
          device_token: fcm_token,
        },
        url: UrlBase.SIGNIN,
      });
    }

    // if (!regex.test(formState.pass)) {
    //   if (!uppercase.test(formState.pass)) {
    //     handleChange({
    //       pass_e: true,
    //       desc1: 'Password must include at least one uppercase letter',
    //     });
    //     return;
    //   }
    //   if (!lowercase.test(formState.pass)) {
    //     handleChange({
    //       pass_e: true,
    //       desc1: 'Password must include at least one lowercase letter',
    //     });
    //     return;
    //   }
    //   if (!number.test(formState.pass)) {
    //     handleChange({
    //       pass_e: true,
    //       desc1: 'Password must include at least one number',
    //     });
    //     return;
    //   }
    //   if (!specialChar.test(formState.pass)) {
    //     handleChange({
    //       pass_e: true,
    //       desc1: 'Password must include at least one special character',
    //     });
    //     return;
    //   }

    //   if (!minLength.test(formState.pass)) {
    //     handleChange({
    //       pass_e: true,
    //       desc1: 'Password must be at least 12 characters long',
    //     });
    //     return;
    //   }
    // } else {
    // if (formState.mail != '' && formState.pass == formState.setpass) {

    // } else {
    //   handleChange({
    //     setpass_e: true,
    //     desc2: 'Password does not match',
    //     pass_e: false,
    //   });
    // }
    // }
  }

  return (
    <>
      <View style={{ height: Dimensions.get("window").height }}>
        <ActionBar
          txt={"Login"}
          onPress={() => {
            navigation.navigate("start");
          }}
        ></ActionBar>

        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          bounces={true}
        >
          <View style={{ marginHorizontal: "5%" }}>
            <View style={{ marginTop: "20%", alignSelf: "center" }}>
              <LockBox></LockBox>
            </View>

            <View style={{ marginTop: "5%", alignSelf: "center" }}>
              <LoginTitle txt="Log in to your account"></LoginTitle>
            </View>

            <View style={{ marginVertical: "10%" }}>
              <MailInputBox
                error={formState.mail_e}
                title={"Email"}
                desc={"Please enter your e-mail address"}
                hint={"Your Email"}
                value={formState.mail}
                onChangeText={(param) => {
                  handleChange({ mail: param });
                }}
              ></MailInputBox>
              <View style={{ marginTop: "3%" }}>
                <PasswordInputBox
                  eye={formState.eye}
                  error={formState.pass_e}
                  title={"Password"}
                  desc={formState.desc1}
                  hint={"Your Password"}
                  value={formState.pass}
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
              </View>
              <View style={{ marginTop: "8%" }}>
                <FhLoginButton
                  value={"Login Now"}
                  onPress={() => {
                    // navigation.navigate("pi")
                    validation();
                  }}
                ></FhLoginButton>
              </View>

              <View style={{ marginTop: "8%", alignSelf: "center" }}>
                <FhtitleBox
                  txt={"Forgot Password?"}
                  onPress={() => {
                    console.log("Amnu");
                    navigation.navigate("em", {
                      mail: formState?.mail,
                    });
                  }}
                ></FhtitleBox>
              </View>
              <View style={{ marginTop: "8%", alignSelf: "center" }}>
                <RegistertitleBox
                  onPress={() => {
                    navigation.navigate("start");
                  }}
                  txt={"Don't have an account?"}
                  txt1={"Register"}
                ></RegistertitleBox>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* <BackgorundWave width={"100%"} height={"20%"}></BackgorundWave> */}
      </View>
      <View style={styles.footerContainer}>
        <Image
          source={require("../../assets/images/footer_v1.png")}
          style={styles.footerImage}
        />
        <Image
          source={require("../../assets/images/footer_v2.png")}
          style={styles.footerImage}
        />
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
  footerContainer: {
    position: "absolute",
    bottom: 0,
  },
  footerImage: {
    width: CustomDimensions.screenWidth,
    position: "absolute",
    bottom: 0
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
