import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CustomColors } from "../utils/common/CustomColors";
import { CustomColors as CSCS } from "../utils/common/CustomStyles";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Platform,
  Linking,
  PermissionsAndroid,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import MyActivity from "../screens/activity/MyActivity";
import MyAccount from "../screens/myAccount/MyAccount";
import SubscriptionIndex from "../screens/SubscriptionPlan";
import Home from "../assets/icon/TabHome.svg";
import ActiveHome from "../assets/icon/TabActiveHome.svg";
import Activity from "../assets/icon/TabActivity.svg";
import ActiveActivity from "../assets/icon/TabActiveActivity.svg";
import Profile from "../assets/icon/TabUser.svg";
import ActiveProfile from "../assets/icon/TabActiveUser.svg";
import ActiveSubscription from "../assets/icon/TabActiveSubs.svg";
import Subscription from "../assets/icon/TabSubs.svg";
import { moderateScale } from "../utils/common/Metrics";
import { CustomFonts } from "../utils/common/CustomStyles";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import HomeScreen from "../screens/home/homescreen";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";

import GpsSignalLoss from "../screens/home/gpssignalloss";

// import notifee, { AndroidStyle } from '@notifee/react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Top = createMaterialTopTabNavigator();

const iconSize = 25;

export default function BottomTabNavigation() {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  useEffect(() => {
    const unsubscribeForeground = messaging().onMessage(async (message) => {
      console.log("Anbuuuuuu from forground..." + JSON.stringify(message));
      // setforeground(message)

      console.log(
        "Anbuuuuuu from forground 2..." +
          JSON.stringify(
            message?.notification?.title + " " + message?.notification?.body
          )
      );

      alert(message?.notification?.title + " " + message?.notification?.body)

      // f = message?.data
      // console.log(JSON.stringify(f) + " Message....")
      // if (message?.notification?.android?.clickAction) {
      //   const clickAction = JSON.parse(message?.notification?.android?.clickAction)
      //   f = clickAction
      // }
      // onDisplayNotification(message);
    });
    const fetchInitialNotification = async () => {
      try {
        const message = await messaging().getInitialNotification();
        console.log("Initial notification:", message);
      } catch (error) {
        console.error("Error fetching initial notification:", error);
      }
    };
    fetchInitialNotification();

    const back = messaging().onNotificationOpenedApp((message) => {
      console.log("Initial notification:", message);
    });

    // const registerBackgroundHandler = async () => {
    //   messaging().setBackgroundMessageHandler(async remoteMessage => {
    //     console.log('Message handled in the background!', remoteMessage);
    //   });
    // };

    // registerBackgroundHandler();

    // const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
    //   switch (type) {
    //     case EventType.DISMISSED:
    //       console.log('User dismissed notification', detail.notification);
    //       break;
    //     case EventType.PRESS:
    //       console.log(JSON.stringify(f) + " Foregrounddd....")
    //       Route(f)
    //       console.log('User pressed notification', detail.notification);
    //       break;
    //   }
    // });

    return () => {
      unsubscribeForeground();
      // initial()
      back();
      // unsubscribe();
      // background()
    };
  }, []);

  // useEffect(() => {
  //   async function onDisplayNotification() {
  //     // Request permissions (required for iOS)
  //     await notifee.requestPermission();

  //     // Create a channel (required for Android)
  //     const channelId = await notifee.createChannel({
  //       id: "default",
  //       name: "Default Channel",
  //     });

  //     // Display a notification
  //     await notifee.displayNotification({
  //       title: "Notification Title",
  //       body: "Main body content of the notification",
  //       android: {
  //         channelId,
  //         smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
  //         // pressAction is needed if you want the notification to open the app when pressed
  //         pressAction: {
  //           id: "default",
  //         },
  //       },
  //     });
  //   }
  //   onDisplayNotification();
  // }, []);

  useEffect(() => {
    async function handlePermission() {
      if (Platform.OS === "android") {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log("Authorization status:", authStatus);
        }
      }
    }
    handlePermission();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="MyAccount"
      screenOptions={styles.container}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => {
            return (
              <>
                {focused ? (
                  <ActiveHome width={iconSize} height={iconSize} />
                ) : (
                  <Home width={iconSize} height={iconSize} />
                )}
              </>
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#5525A5" : "#000",
                fontFamily: CustomFonts.PoppinsRegular,
                fontWeight: CSCS.neutral_600,
                borderBottomWidth: focused ? moderateScale(5) : 0,
                borderBottomColor: "#5525A5",
                fontSize: moderateScale(12),
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="MyActivity"
        component={MyActivity}
        options={{
          title: "Activity",
          tabBarIcon: ({ color, focused }) => {
            return (
              <>
                {focused ? (
                  <ActiveActivity width={iconSize} height={iconSize} />
                ) : (
                  <Activity width={iconSize} height={iconSize} />
                )}
              </>
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#5525A5" : "#000",
                fontFamily: CustomFonts.PoppinsRegular,
                fontWeight: CSCS.neutral_600,
                borderBottomWidth: focused ? moderateScale(5) : 0,
                borderBottomColor: "#5525A5",
                fontSize: moderateScale(12),
              }}
            >
              Activity
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Subscription"
        component={SubscriptionIndex}
        options={{
          title: "Subscription",
          tabBarIcon: ({ color, focused }) => {
            return (
              <>
                {focused ? (
                  <ActiveSubscription width={iconSize} height={iconSize} />
                ) : (
                  <Subscription width={iconSize} height={iconSize} />
                )}
              </>
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#5525A5" : "#000",
                fontFamily: CustomFonts.PoppinsRegular,
                fontWeight: CSCS.neutral_600,
                borderBottomWidth: focused ? moderateScale(5) : 0,
                borderBottomColor: "#5525A5",
                fontSize: moderateScale(12),
              }}
            >
              Subscription
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: "My Account",
          tabBarIcon: ({ color, focused }) => {
            return (
              <>
                {focused ? (
                  <ActiveProfile width={iconSize} height={iconSize} />
                ) : (
                  <Profile width={iconSize} height={iconSize} />
                )}
              </>
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#5525A5" : "#000",
                fontFamily: CustomFonts.PoppinsRegular,
                fontWeight: CSCS.neutral_600,
                borderBottomWidth: focused ? moderateScale(5) : 0,
                borderBottomColor: "#5525A5",
                fontSize: moderateScale(12),
              }}
            >
              My Account
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: CustomColors.actionbar_clr,
        },
        contentStyle: { backgroundColor: CustomColors.white },

        headerTintColor: CustomColors.white,
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Anbu() {
  return <Text>Anbu</Text>;
}

const styles = StyleSheet.create({
  container: {
    headerShown: false,
    tabBarActiveTintColor: CustomColors.button_colour,
    tabBarInactiveTintColor: CustomColors.button_colour,

    tabBarStyle: {
      height: 60,
      borderColor: CustomColors.bordercolour,
      paddingTop: 5,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      color: CustomColors.textcolour,
      paddingBottom: 10,
    },
  },
});
