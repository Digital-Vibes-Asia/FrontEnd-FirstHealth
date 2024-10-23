import * as React from "react";
import {
  View,
  Image,
  Linking,
  Text,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EuctoLoginScreen from "../screens/login/euctologinscreen";
import { useSelector, useDispatch } from "react-redux";
import { setfcm, setinternetstatus } from "../store/value";
import BottomTabNavigation from "./bottomnavigator";
import BootSplash from "react-native-bootsplash";
import NetInfo from "@react-native-community/netinfo";
import StartScreen from "../screens/SignUp/startscreen";
import { CustomColors } from "../utils/common/CustomStyles";
import PersonalInfoForm from "../screens/SignUp/personalinfoform";
import CheckCoverageArea from "../screens/SignUp/checkcoveragearea";
import CheckingBoundary from "../screens/SignUp/checkingboundary";
import SetPassword from "../screens/SignUp/setpassword";
import MedicalInfo from "../screens/SignUp/medicalinfo";
import RefferalNumber from "../screens/SignUp/refferalnumber";
import UncoverArea from "../screens/SignUp/uncoverarea";
import NeedNotify from "../screens/SignUp/neednotify";
import SubscriptionPlans from "../screens/SignUp/subscriptionplans";
import ReviewMembership from "../screens/SignUp/reviewmembership";
import LoginScreen from "../screens/login/loginscreen";
import ExistingPlan from "../screens/SignUp/existingplan";
import PlanSuccess from "../screens/SignUp/plansuccess";
import Step1 from "../screens/myAccount/Step1";
import NoSlot from "../screens/SignUp/noslot";
import MyActivity from "../screens/activity/MyActivity";
import MedicalInfoUpdate from "../screens/myAccount/Step3";
import CloseAccount from "../screens/myAccount/CloseAccount";
import FAQComp from "../screens/myAccount/FAQ";
import TermsAndCondition from "../screens/myAccount/TermsandCondition";
import UpdateStep2 from "../screens/myAccount/Step2";
import MyProfile from "../screens/myAccount/MyProfile";
import SubscriptionDependantUser from "../screens/SubscriptionPlan/subscriptionDependantUser/subscriptionDependantUser";
import FreeUserScreen from "../screens/SubscriptionPlan/freeUserScreen";
import SubscriptionIndex from "../screens/SubscriptionPlan";
import DependantUserInvite from "../screens/SubscriptionPlan/dependantInvitingScreens/dependantUserInvite";
import PrincipalUsrQualifyingAndActive from "../screens/SubscriptionPlan/subscriptionPrincipalUser/principalUsrQualifyingAndActive";
import PrincipalUserExpired from "../screens/SubscriptionPlan/subscriptionPrincipalUser/PrincipalUserExpired";

import EnterMail from "../screens/forgotpassword/entermail";
import ResetPassword from "../screens/forgotpassword/resetpassword";
import MailSent from "../screens/forgotpassword/emailsent";
import ResetSuccess from "../screens/forgotpassword/resetsuccess";
import RenewExpiredUser from "../screens/SubscriptionPlan/subscriptionPrincipalUser/RenewExpiredUser";
import MemberRenew from "../screens/SubscriptionPlan/subscriptionPrincipalUser/MemberReview";

import AddScreen from "../screens/SubscriptionPlan/adddependants/addscreen";
import PurchaseSlots from "../screens/SubscriptionPlan/adddependants/purchaseslots";
import AddMember from "../screens/SubscriptionPlan/adddependants/addmember";
import InviteSuccess from "../screens/SubscriptionPlan/adddependants/invitesuccess";
import InviteUnSuccess from "../screens/SubscriptionPlan/adddependants/inviteunsuccess";
import ManualRegisterOne from "../screens/SubscriptionPlan/adddependants/manualregisterone";
import ManualRegisterTwo from "../screens/SubscriptionPlan/adddependants/manualregistertwo";
import SuccessNotification from "../common/Screens/SuccessNotification";
import SubsSuccess from "../screens/SignUp/SubsSuccess";
import messaging from "@react-native-firebase/messaging";

import Address from "../screens/SignUp/address";

import GpsSignalLoss from "../screens/home/gpssignalloss";
import CancelSuccess from "../screens/home/cancelsuccess";

import CallHoldingScreen from "../screens/home/callHoldingScreen";

import DirectionScreen from "../screens/home/directionScreen";

import CheckingAddress from "../screens/SignUp/checkingaddress";
import SenangPayPayment from "../common/Dialogs/Senangpay";
import PurchaseSuccess from "../screens/SummmaryCards/purchaseSuccess";
import RenewSuccess from "../screens/SummmaryCards/RenewSuccess";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Navigator() {
  const token = useSelector(
    (state) => state.operation.authentication?.access_token
  );

  const Istatus = useSelector((state) => state.operation?.internet);

  const [initialRoute, setInitialRoute] = useState(() => {
    return !Istatus ? "mi" : token ? "mi" : "mi";
  });

  console.log(initialRoute + " Initial Route...");

  const setRedux = useDispatch();

  const linking = {
    prefixes: ["firsthealth://"],
    config: {
      screens: {
        rs: "reset-password",
        pi: "pi",
      },
    },
  };

  useEffect(() => {
    const handleUrl = ({ url }) => {
      console.log(url + " Url....");
    };

    Linking.addEventListener("url", handleUrl);

    // return () => {
    //   Linking.removeEventListener('url', handleUrl);
    // };
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setRedux(setinternetstatus({ internet: state.isConnected }));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  console.log(token, Istatus, "token validator ---->");

  useEffect(() => {
    // if (Platform.OS == "android") {
    register();
    // }
  }, []);

  async function register() {
    // await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();

    console.log(token + " ===Token....");

    setRedux(setfcm({ fcm_token: token }));
  }

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      onReady={() => BootSplash.hide({ fade: true })}
    >
      <Stack.Navigator
        // initialRouteName={initialRoute}
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: { animation: "timing", config: { duration: 500 } },
            close: { animation: "timing", config: { duration: 500 } },
          },
          headerStyle: {
            backgroundColor: CustomColors.actionbar_clr,
          },
          headerTintColor: CustomColors.white,
          headerShown: false,
          contentStyle: { backgroundColor: CustomColors.white },
          cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {Istatus ? (
          token ? (
            <>
              <Stack.Screen name="main" component={BottomTabNavigation} />
              <Stack.Screen name="MyProfile" component={MyProfile} />
              <Stack.Screen name="step1" component={Step1} />
              <Stack.Screen name="step2" component={UpdateStep2} />
              <Stack.Screen name="step3" component={MedicalInfoUpdate} />
              <Stack.Screen name="subp" component={SubscriptionPlans} />
              <Stack.Screen name="isuccess" component={SubsSuccess} />
              <Stack.Screen name="renewsuccess" component={RenewSuccess} />
              <Stack.Screen name="PUExpired" component={PrincipalUserExpired} />
              <Stack.Screen name="RenewExpired" component={RenewExpiredUser} />
              <Stack.Screen name="MemReview" component={MemberRenew} />
              <Stack.Screen name="ps" component={PlanSuccess} />
              <Stack.Screen name="inviteSucess" component={InviteSuccess} />
              <Stack.Screen
                name="TermsAndCondition"
                component={TermsAndCondition}
              />
              <Stack.Screen
                name="rm"
                component={ReviewMembership}
                options={{
                  contentStyle: { backgroundColor: CustomColors.grey_bg },
                }}
              />
              <Stack.Screen name="FAQ" component={FAQComp} />
              <Stack.Screen name="CloseAccount" component={CloseAccount} />
              <Stack.Screen name="MyActivity" component={MyActivity} />
              <Stack.Screen name="ns" component={NoSlot} />
              <Stack.Screen name="exp" component={ExistingPlan} />
              <Stack.Screen name="addscreen" component={AddScreen} />
              <Stack.Screen name="addmember" component={AddMember} />
              <Stack.Screen name="addslots" component={PurchaseSlots} />
              <Stack.Screen name="mr" component={ManualRegisterOne} />
              <Stack.Screen name="mrtwo" component={ManualRegisterTwo} />
              <Stack.Screen name="unsuccess" component={InviteUnSuccess} />
              <Stack.Screen name="si" component={SubscriptionIndex} />
              <Stack.Screen name="fus" component={FreeUserScreen} />
              <Stack.Screen name="sdu" component={SubscriptionDependantUser} />
              <Stack.Screen name="senapay" component={SenangPayPayment} />
              <Stack.Screen name="dui" component={DependantUserInvite} />
              <Stack.Screen
                name="puqaa"
                component={PrincipalUsrQualifyingAndActive}
              />
              <Stack.Screen
                name="gps"
                component={GpsSignalLoss}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="chs"
                component={CallHoldingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="cs"
                component={CancelSuccess}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="mansuccess" component={SuccessNotification} />

              <Stack.Screen name="dir" component={DirectionScreen} />
              <Stack.Screen name="purchasesuc" component={PurchaseSuccess} />
            </>
          ) : (
            <>
              {/* <Stack.Screen name="chs" component={CheckingAddress} /> */}

              <Stack.Screen name="start" component={StartScreen} />
              <Stack.Screen name="pi" component={PersonalInfoForm} />
              <Stack.Screen name="cca" component={CheckCoverageArea} />
              <Stack.Screen name="ua" component={UncoverArea} />
              <Stack.Screen name="cb" component={CheckingBoundary} />
              <Stack.Screen name="senapay" component={SenangPayPayment} />
              <Stack.Screen name="sp" component={SetPassword} />
              <Stack.Screen name="mi" component={MedicalInfo} />
              <Stack.Screen name="rn" component={RefferalNumber} />
              <Stack.Screen name="nn" component={NeedNotify} />
              <Stack.Screen name="subp" component={SubscriptionPlans} />
              <Stack.Screen name="exp" component={ExistingPlan} />
              <Stack.Screen name="ps" component={PlanSuccess} />
              <Stack.Screen name="ns" component={NoSlot} />
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen
                name="rm"
                component={ReviewMembership}
                options={{
                  contentStyle: { backgroundColor: CustomColors.grey_bg },
                }}
              />

              <Stack.Screen name="em" component={EnterMail} />
              <Stack.Screen name="rs" component={ResetPassword} />
              <Stack.Screen name="ms" component={MailSent} />
              <Stack.Screen name="prs" component={ResetSuccess} />
              <Stack.Screen name="isuccess" component={SubsSuccess} />

              <Stack.Screen name="add" component={Address} />
              <Stack.Screen name="purchasesuc" component={PurchaseSuccess} />
              {/* <Stack.Screen name="login" component={LoginScreen} /> */}
            </>
          )
        ) : (
          <>
            <Stack.Screen name="net" component={NoInternet} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function NoInternet() {
  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        backgroundColor: CustomColors.white,
      }}
    >
      <Image
        style={{ width: "80%", height: "50%" }}
        resizeMode="center"
        source={require("./../assets/images/nointernet.png")}
      />
    </View>
  );
}

export default Navigator;
