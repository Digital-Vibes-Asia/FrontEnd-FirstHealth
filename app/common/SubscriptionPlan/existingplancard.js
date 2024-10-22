import { TextInput, StyleSheet, View, Pressable, Text } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NextFhButton from "../Button/nextfhbutton";
import NextFillButton from "../Button/nextfillbutton";
import SigninButton from "../Button/signinbutton";
import SignupTitle from "../TittleBox/signuptitle";
import StepTxt from "../TittleBox/steptxt";
import PersonIcon from "../../assets/icon/personicon.svg";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/common/Metrics";
import InfoIcon from "../../assets/icon/planinfoicon.svg";
import CheckboxIcon from "../../assets/icon/checkboxicon.svg";
import FmButton from "../Button/fmbutton";
import YellowInfoIcon from "../../assets/icon/yellowicon.svg";
import moment from "moment";

export default function ExistingPlanCard({ onPress, item }) {
  console.log(JSON.stringify(item) + "...WHat is item");

  const data = item?.user_subscription;

  let key_benefits = JSON.parse(
    item?.user_subscription?.subscription_master?.key_benefits
  );

  return (
    <>
      <View style={{ marginBottom: verticalScale(10) }}>
        <Pressable
          style={[styles.container, styles.shadowProp, styles.elevation]}
          onPress={onPress}
        >
          <View style={styles.heading}>
            <Text style={styles.heading_txt}>Your Invited Plan</Text>
          </View>
          <View style={{ paddingHorizontal: horizontalScale(20) }}>
            <View style={{ alignItems: "center", flex: 1 }}>
              <View style={{ marginTop: verticalScale(10) }}>
                <PersonIcon
                  width={CustomDimensions.icon_width_15}
                  height={CustomDimensions.icon_height_15}
                ></PersonIcon>
              </View>
              <View style={styles.margintop_10}>
                <Text style={styles.plan_title}>
                  {data?.subscription_master.plan}
                </Text>
              </View>
              {data?.is_qualifying_period && (
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: CustomColors.yellow_alert,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: horizontalScale(10),
                    paddingVertical: verticalScale(5),
                    borderRadius: moderateScale(32),
                    marginTop: verticalScale(5),
                  }}
                >
                  <Text style={styles.qualify}>{"QUALIFYING PERIOD: "}</Text>
                  <Text style={styles.qualify}>
                    {data?.days_left_in_qualifying_period}
                    {" DAYS LEFT"}
                  </Text>
                  <View style={{ marginLeft: verticalScale(5) }}>
                    <YellowInfoIcon
                      width={CustomDimensions.icon_width_20}
                      height={CustomDimensions.icon_height_20}
                    ></YellowInfoIcon>
                  </View>
                </View>
              )}
            </View>
            <View style={{ marginBottom: "2%" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: verticalScale(10),
                  paddingHorizontal: horizontalScale(10),
                  justifyContent: "flex-start",
                  alignSelf: "center",
                }}
              >
                <Text style={styles.left}>{"Referral Name"}</Text>
                <Text style={styles.right} numberOfLines={2}>
                  {data?.user?.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: verticalScale(10),
                  paddingHorizontal: horizontalScale(10),
                  alignSelf: "center",
                }}
              >
                <Text style={styles.left}>{"Subscription ID"}</Text>
                <Text style={styles.right} numberOfLines={2}>
                  {data?.referral_no}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: verticalScale(10),
                  paddingHorizontal: horizontalScale(10),
                  alignSelf: "center",
                }}
              >
                <Text style={styles.left}>{"Start Date"}</Text>
                <Text style={styles.right} numberOfLines={2}>
                  {moment(data?.start_date).format("DD MMM YYYY")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: verticalScale(10),
                  paddingHorizontal: horizontalScale(10),
                  alignSelf: "center",
                }}
              >
                <Text style={styles.left}>{"End Date"}</Text>
                <Text style={styles.right} numberOfLines={2}>
                  {moment(data?.end_date).format("DD MMM YYYY")}
                </Text>
              </View>
            </View>
            {!data?.free_plan && (
              <>
                <View style={styles.key_container}>
                  <View style={styles.key_line}></View>
                  <Text style={styles.key_text}>KEY BENEFITS</Text>
                  <View style={styles.key_line}></View>
                </View>

                <View style={styles.key_vertical_container}>
                  <View style={{ flex: 1 / 2 }}>
                    <Text style={styles.emergency}>
                      {key_benefits?.emergency_calls}
                    </Text>
                    <View style={styles.emergency_container}>
                      <Text style={styles.benefit_txt}>Emergency Trips</Text>
                      <InfoIcon
                        width={CustomDimensions.icon_width_20}
                        height={CustomDimensions.icon_height_20}
                      ></InfoIcon>
                    </View>
                  </View>
                  <View style={{ flex: 1 / 4, alignItems: "center" }}>
                    <View style={styles.key_vertical_line}></View>
                  </View>

                  <View style={{ flex: 1 / 2 }}>
                    <Text style={styles.emergency}>
                      {key_benefits?.clinic_calls}
                    </Text>
                    <View style={styles.emergency_container}>
                      <Text style={styles.benefit_txt}>
                        Non-emergency Trips{" "}
                      </Text>
                      <InfoIcon
                        width={CustomDimensions.icon_width_20}
                        height={CustomDimensions.icon_height_20}
                      ></InfoIcon>
                    </View>
                  </View>
                </View>
              </>
            )}

            <View style={styles.key_container}>
              <View style={styles.key_line}></View>
              {!item?.free_plan ? (
                <Text style={styles.key_text}>OTHER BENEFITS</Text>
              ) : (
                <Text style={styles.key_text}>BENEFITS</Text>
              )}
              <View style={styles.key_line}></View>
            </View>

            <View
              style={{
                marginTop: verticalScale(10),
                marginBottom: verticalScale(30),
              }}
            >
              {data?.subscription_master?.benefits.map((item, index) => {
                return (
                  <View style={styles.other_benefits} key={item.id}>
                    <CheckboxIcon
                      width={CustomDimensions.icon_width_30}
                      height={CustomDimensions.icon_height_30}
                    ></CheckboxIcon>
                    <Text style={styles.otherben_txt}>
                      {item?.benefit_description}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.white,
    // paddingHorizontal: horizontalScale(20),
    // paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: CustomColors.neutralgrey_200,
    flex: 1,
  },
  qualify: {
    color: CustomColors.yellow_800,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(14),
  },

  left: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(18),
    width: "50%",
  },
  right: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
    marginLeft: horizontalScale(30),
    width: "50%",
  },

  heading: {
    height: verticalScale(40),
    backgroundColor: CustomColors.new_theme_clr,
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  heading_txt: {
    color: CustomColors.white,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(14),
  },

  margintop_10: {
    marginTop: verticalScale(5),
  },

  shadowProp: {
    shadowColor: CustomColors.black,
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },

  elevation: {
    // elevation: 20,
    // shadowColor: CustomColors.black,
  },

  gap_20: {
    marginLeft: CustomDimensions.mar_20,
  },
  title: {
    color: CustomColors.red,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.ComfortaaSemiBold,
  },
  plan_title: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.txt_22,
    fontFamily: CustomFonts.PoppinsMedium,
    lineHeight: verticalScale(26),
  },
  small_start: {
    color: CustomColors.neutral_500,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(14),
  },
  year_start: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.verylarge_title,
    fontFamily: CustomFonts.PoppinsRegular,
    // lineHeight: verticalScale(24),
  },
  txt_scratch: {
    color: CustomColors.error_red,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    textDecorationLine: "line-through",
    lineHeight: verticalScale(14),
  },
  amount_title: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.size_32,
    fontFamily: CustomFonts.PoppinsSemiBold,
    // lineHeight: verticalScale(38)
  },
  key_text: {
    color: CustomColors.neutral_500,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    marginHorizontal: horizontalScale(5),
    lineHeight: verticalScale(14),
  },
  key_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  key_line: {
    borderBottomColor: CustomColors.neutralgrey_200,
    borderBottomWidth: 1,
    flex: 1,
  },

  key_vertical_line: {
    borderLeftColor: CustomColors.bordercolour,
    borderLeftWidth: 1,
    height: "100%",
  },

  key_vertical_container: {
    marginTop: verticalScale(10),
    flexDirection: "row",
    alignContent: "center",
    height: "15%",
  },
  emergency_container: {
    flexDirection: "row",
    marginTop: verticalScale(5),
    alignSelf: "center",
  },

  emergency: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.large_title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    textAlign: "center",
    lineHeight: verticalScale(28),
  },
  benefit_txt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    textAlign: "center",
    lineHeight: verticalScale(18),
    marginRight: horizontalScale(5),
  },

  free_plan_heading: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.txt_22,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(26),
    textAlign: "center",
    marginTop: verticalScale(10),
  },
  free_plan_subhead: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(19),
    textAlign: "center",
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
  },

  otherben_txt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
    marginHorizontal: horizontalScale(10),
  },
  other_benefits: {
    flexDirection: "row",
    marginTop: verticalScale(10),
    alignItems: "center",
  },

  txtgap: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: CustomDimensions.mar_5,
  },
});
