import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Share,
  Linking,
  useCallback,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from "../../../utils/common/CustomStyles";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utils/common/Metrics";
import SubscriptionActionBar from "../../../common/ActionBar/subscriptionactionbar";
import ShareCard from "../../../common/Referralshare/sharecard";
import AddDependancyCard from "../../../common/SubscriptionPlan/adddependencycard";
import AddDependancySubmit from "../../../common/Button/adddepandancysubmit";
import Clipboard from "@react-native-clipboard/clipboard";
import { useGetQuery } from "../../../store/api";
import { UrlBase } from "../../../utils/common/urlbase";
import { setavailslot, settype } from "../../../store/value";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useReducer } from "react";
import AreYouSure from "../../../common/Dialogs/areyousure";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

const AsReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function AddScreen() {
  const navigation = useNavigation();

  const [formState, dispatch] = useReducer(AsReducer, {
    sdialog: false,
    prefilledmsg: "",
  });

  const availslot = useSelector((state) => state.operation?.availslot);

  const filledarr = availslot.filter((item) => {
    return item.filled;
  });

  const unfilledarr = availslot.filter((item) => {
    return !item.filled;
  });

  console.log(JSON.stringify(availslot) + " Available Slot from redux");

  const { data, error, refetch } = useGetQuery(UrlBase.GETAVAILABLEVACANCY);

  const setRedux = useDispatch();

  const rs = useSelector((state) => state.operation?.rs);

  console.log(JSON.stringify(rs) + " Rs...");

  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data) + " Data coming or not...");

      setRedux(
        setavailslot({
          data: data?.remaining,
          rs: data?.remaining_slots,
        })
      );
    } else if (error) {
      console.log(JSON.stringify(error) + " Data coming or not...");
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message)
      );
    }
  }, [data, error]);

  async function integrateApps(url) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: data?.referral_number,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <SubscriptionActionBar
          txt={"Add dependants"}
          onPress={() => navigation.goBack()}
        ></SubscriptionActionBar>
        <View style={{ position: "absolute", top: "15%", left: 0, right: 0 }}>
          <ShareCard
            code={data?.referral_number}
            tclick={() => {
              Linking.openURL("tg://msg?text=FH09582");

              // integrateApps("tg://msg")
            }}
            wclick={() => {
              Linking.openURL("https://wa.me/?text=FH09582");
              // integrateApps("https://wa.me/?text=urlencodedtext")
              console.log("wclick");
            }}
            cclick={() => {
              console.log("cClick");
              Clipboard.setString(data?.referral_number);
            }}
            sclick={() => {
              onShare();
            }}
          ></ShareCard>

          <View style={{ marginTop: "10%" }}>
            <Text style={styles.normaltxt}>
              {" "}
              Or <Text style={styles.boldltxt}>add dependants </Text> to your
              account
            </Text>
          </View>
          <ScrollView
            style={{ height: verticalScale(300) }}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            keyboardShouldPersistTaps="handled"
            bounces={true}
          >
            <View style={{ marginTop: "5%", marginHorizontal: "5%" }}>
              <AddDependancyCard
                data={availslot}
                onpress={(param) => {
                  let type;
                  switch (param?.type) {
                    case "Adult member":
                      type = "Adult";
                      break;
                    case "Senior member":
                      type = "Senior";
                      break;
                    case "Child member":
                      type = "Child";
                      break;
                  }
                  setRedux(
                    settype({
                      type: type,
                      data: param,
                    })
                  );
                  navigation.navigate("addmember", {
                    param: param,
                    referal: data?.referral_number,
                  });
                }}
              ></AddDependancyCard>
            </View>
          </ScrollView>
        </View>
      </View>
      <AreYouSure
        modalVisible={formState.sdialog}
        count={rs}
        onyes={() => {
          handleChange({ sdialog: false });
          navigation.navigate("main", {
            screen: "Subscription",
          });
          console.log("DONe");
        }}
        onno={() => {
          handleChange({ sdialog: false });
          
          console.log("DONe");
        }}
        setModalVisible={() => {
          handleChange({ sdialog: false });
        }}
      ></AreYouSure>
      <AddDependancySubmit
        eligible={filledarr.length > 0 ? true : false}
        value={"Save and exit"}
        onPress={() => {
          if (unfilledarr.length > 0) {
            handleChange({ sdialog: true });
          }
        }}
      ></AddDependancySubmit>
    </>
  );
}

// /* Product Cards */
const styles = StyleSheet.create({
  normaltxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
    textAlign: "center",
  },
  boldltxt: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(18),
    textAlign: "center",
  },
});
