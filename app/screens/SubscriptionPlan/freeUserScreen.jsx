import React, { useEffect, useReducer, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserIcon2 from "../../assets/icon/userIcon2.svg";
import {
  CustomColors,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import Separator from "../../common/Sparator/sparator";
import CheckBoxicon from "../../assets/icon/checkboxicon.svg";
import MemButton from "../../common/Button/MemButton";
import NameInputBox from "../../common/textinputbox/nameinputbox";
import JoinPlanButton from "../../common/Button/joinPlanButton";
import ActionBoxDependent from "../../common/ActionBoxDependent/ActionBoxDependent";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/common/Metrics";
import { UrlBase } from "../../utils/common/urlbase";
import { useSelector } from "react-redux";
import { usePostMutation } from "../../store/api";

export default function FreeUserScreen({ subsData }) {
  const [isError, setError] = useState(false);
  const rmAmount = subsData?.user_subscription?.subscription_master?.price;
  const otherBenefits =
    subsData?.user_subscription?.subscription_master?.benefits;
  const plan = subsData?.user_subscription?.subscription_master?.plan;
  const name = subsData?.user_subscription?.name;
  const user_id = subsData?.user_subscription?.user_id;

  const navigation = useNavigation();

  const PIReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, ...action.fields };
      default:
        return state;
    }
  };

  const [step5, { data, error }] = usePostMutation();

  const [formState, dispatch] = useReducer(PIReducer, {
    referral: "",
    progressBar: false,
  });

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  function validation() {
    step5({
      data: {
        referral_number: formState.referral,
        id: user_id,
      },
      url: UrlBase.STEP5,
    });
  }

  useEffect(() => {
    if (data) {
      if (!data?.is_valid) {
        navigation.navigate("subp");
      } else {
        if (data?.eligible_plans.length > 0) {
          setError(false);
          navigation.navigate("exp", {
            screen: "freeUser",
            refer_id: formState?.referral,
            age_group: data?.age_group,
          });
        } else {
          navigation.navigate("ns", {
            plan: data?.subscription_plan,
          });
        }
      }
    } else if (error) {
      // navigation.navigate("subp")
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message)
      );
    }
    handleChange({ progressBar: false });
  }, [data, error]);

  return (
    <View style={{ backgroundColor: CustomColors.grey_bg, flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        bounces={false}
      >
        <ActionBoxDependent
          txt={name}
          screen={"freeUser"}
          contentHeight={273}
          planName={plan}
        ></ActionBoxDependent>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingTop: moderateScale(20),
          }}
        >
          <View style={styles.proCard}>
            <UserIcon2></UserIcon2>
            <Text style={styles.txt}>Free Membership</Text>
            <Text style={styles.NumTxt}>RM{rmAmount}</Text>
            <Text style={styles.txtPay}>And pay direct later</Text>

            <Separator />

            {otherBenefits?.map((item, index) => (
              <View style={styles.checkTile} key={index}>
                <CheckBoxicon />
                <Text style={styles.checkTxt}>{item.benefit_description}</Text>
              </View>
            ))}

            <View style={{ marginTop: "5%", width: "100%" }}>
              <MemButton
                value={"Upgrade Plan"}
                onPress={() => {
                  navigation.navigate("subp", { screen: "freeMembership" });
                }}
              ></MemButton>
            </View>
          </View>
          <View style={styles.emptView} />
          <View style={styles.secView}>
            <Text style={styles.titTxt}>
              Join an Existing Subscription Plan
            </Text>
            <Text style={styles.conTxt}>
              <Text
                style={{
                  fontWeight: "600",
                  color: CustomColors.black,
                  fontfamily: CustomFonts.PoppinsSemiBold,
                }}
              >
                Got a referral ID?{" "}
              </Text>
              Enter the number below to join an existing plan. This will link
              your account to the plan and grant you access to its benefits.
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: moderateScale(20),
              paddingBottom: moderateScale(10),
            }}
          >
            <NameInputBox
              hint={"FH123456"}
              value={formState.referral}
              onChangeText={(param) => {
                handleChange({ referral: param });
              }}
            ></NameInputBox>
            {isError && (
              <Text style={[styles.desctxt, { color: CustomColors.red }]}>
                Enter Valid Referral ID
              </Text>
            )}
          </View>
          <View style={{ width: "100%", padding: 20, paddingTop: 0 }}>
            <JoinPlanButton
              value={"Join Plan "}
              onPress={() => {
                formState?.referral ? validation() : setError(true);
              }}
            ></JoinPlanButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// /* Product Cards */
const styles = StyleSheet.create({
  proCard: {
    /* Auto layout */
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Offset
    shadowOpacity: 0.1, // Opacity
    shadowRadius: 8, // Blur radius
    // Android shadow properties
    elevation: 4, // Elevation level (can be adjusted)l
    // gap: 8,
    width: "95%",
    // /* Shades/White */
    backgroundColor: "#FFFFFF",
    // /* Neutral/200 */
    borderWidth: 1,
    borderColor: CustomColors.border_color,
    borderRadius: 8,

    // /* Inside auto layout */
    order: 0,
    flexGrow: 0,
    padding: moderateScale(20),
  },
  txtPay: {
    fontWeight: "400",
    color: CustomColors.neutral_500,
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: CustomFontSize.normal_12,
    paddingBottom: verticalScale(15),
  },

  txt: {
    fontSize: CustomFontSize.txt_22,
    fontFamily: CustomFonts.PoppinsMedium,
    fontWeight: "500",
    color: CustomColors.new_titile_clr,
    paddingTop: verticalScale(5),
  },
  checkTile: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingTop: verticalScale(15),
  },
  NumTxt: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.size_32,
    fontWeight: "600",
    fontFamily: CustomFonts.PoppinsSemiBold,
  },
  emptView: {
    marginTop: moderateScale(30),
    marginBottom: moderateScale(20),
    borderWidth: 4,
    width: "100%",
    borderColor: CustomColors.neutral_100,
  },
  checkTxt: {
    width: "90%",
    paddingLeft: horizontalScale(10),
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    fontfamily: CustomFonts.PoppinsRegular,
    color: CustomColors.neutral_700,
  },
  secView: {
    width: "100%",
    padding: moderateScale(20),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(0),
  },
  titTxt: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.txt_18,
    color: CustomColors.neutral_700,
  },
  conTxt: {
    padding: moderateScale(20),
    paddingLeft: moderateScale(0),
    paddingTop: verticalScale(10),
    paddingBottom: moderateScale(0),
    color: CustomColors.neutral_700,
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
  },
});
