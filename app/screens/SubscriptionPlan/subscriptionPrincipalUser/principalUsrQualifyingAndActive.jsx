import { Pressable, ScrollView, Text, View } from "react-native";
import {
  CustomColors,
  CustomFonts,
  CustomFontSize,
} from "../../../utils/common/CustomStyles";
import ActionBoxDependent from "../../../common/ActionBoxDependent/ActionBoxDependent";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utils/common/Metrics";
import { StyleSheet } from "react-native";
import AlertIcon from "../../../assets/icon/cautionIcon.svg";
import DoubleUserIcon from "../../../assets/icon/doubleUserIcon.svg";
import UserPlusIconSmall from "../../../assets/icon/addpersonicon.svg";
import FreeSlotsButton from "../../../common/Button/freeSlotsButton";
import CheckBoxIcon2 from "../../../assets/icon/check_circle.svg";
import ListIcon from "../../../assets/icon/menu.svg";
import InfoIcon3 from "../../../assets/icon/infoIcon3.svg";
import ListPaperIcon from "../../../assets/icon/listPaperIcon.svg";
import ProgressBox from "../../../common/ProgressBox/progressBox";
import CommonSlots from "../../../common/CommonSlots/commonSlots";
import RightArrow from "../../../assets/icon/rightarrow.svg";
import { useEffect, useMemo } from "react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setActivityPayload } from "../../../store/value";
import RowView from "../../../common/textbox/RowText";
import { Button } from "react-native";
// import notifee, { AndroidStyle } from "@notifee/react-native";

export default function PrincipalUsrQualifyingAndActive({ data }) {
  const navigation = useNavigation();

  const qualifyingPeriod = data?.user_subscription?.is_qualifying_period;
  const totalEmerCalls = data?.user_subscription?.t_emergency_calls || 0;
  const totalNonEmerCalls = data?.user_subscription?.t_clinic_calls || 0;

  const otherBenefits = data?.user_subscription?.subscription_master?.benefits;
  const qualifyLeft = data?.user_subscription?.days_left_in_qualifying_period;

  const userName = useMemo(() => {
    return data?.user_subscription?.name;
  }, [data]);

  const planName = useMemo(() => {
    return data?.user_subscription?.subscription_master?.plan;
  }, [data]);

  const startDate = data?.user_subscription?.start_date;
  const endDate = data?.user_subscription?.end_date;

  const formattedStartDate = moment(startDate).format("DD MMMM YYYY");
  const formattedEndDate = moment(endDate).format("DD MMMM YYYY");

  const setRedux = useDispatch();

  const handleActivity = () => {
    setRedux(
      setActivityPayload({
        filterBy: data?.user_id ?? data?.user_subscription?.user_id,
      })
    );
    navigation.navigate("MyActivity");
  };

  function CommonDependant({ qualifyingPeriod }) {
    return (
      <View style={[styles.cont1]}>
        <View style={styles.cont2}>
          <DoubleUserIcon />
          <Text
            style={[styles.subsTxt, { paddingHorizontal: horizontalScale(10) }]}
          >
            Dependants
          </Text>
        </View>
        <Pressable
          style={styles.cont2}
          onPress={() => navigation.navigate("addslots")}
        >
          <Text style={styles.conTxt}>Purchase new slot</Text>
          <UserPlusIconSmall />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: CustomColors.grey_bg, flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        bounces={false}
      >
        <ActionBoxDependent
          txt={userName}
          contentHeight={237}
          screen={"puqaa"}
          qualifyingPeriod={qualifyingPeriod}
          qualifyLeft={qualifyLeft}
          planName={planName}
        ></ActionBoxDependent>
        <View style={{ width: "100%" }}>
          {qualifyingPeriod === true ? (
            <View style={styles.cardMain}>
              <View
                style={{ width: "100%", paddingHorizontal: moderateScale(16) }}
              >
                <View style={styles.card}>
                  <AlertIcon />
                  <Text style={styles.subsTxt}>
                    Qualifying Period in Progress
                  </Text>
                  <Text style={styles.subsContent}>
                    You have{" "}
                    <Text style={[styles.subsContent, { fontWeight: "600" }]}>
                      {" "}
                      {qualifyLeft} days remaining in the Qualifying Period.
                    </Text>{" "}
                    This is a standard review process to ensure all details are
                    correct. During this time, you and any dependants are not
                    yet entitled to utilize member benefits.{" "}
                  </Text>
                  <Text
                    style={[
                      styles.subsContent,
                      { paddingTop: verticalScale(15) },
                    ]}
                  >
                    You will be notified once your membership is fully active.
                    Thank you for your patience.
                  </Text>
                </View>
              </View>
              <View style={{ marginHorizontal: moderateScale(16) }}>
                <CommonDependant qualifyingPeriod={qualifyingPeriod} />
                <CommonSlots data={data} />
                <FreeSlotsButton data={data} />
              </View>
            </View>
          ) : (
            <View style={{ marginHorizontal: moderateScale(16) }}>
              <View style={{ marginTop: verticalScale(30) }}>
                <ProgressBox data={data} />
              </View>
              <CommonDependant qualifyingPeriod={qualifyingPeriod} />
              <CommonSlots data={data} />
              <FreeSlotsButton data={data} />
              <View style={styles.actBtnContainer}>
                <Pressable
                  onPress={() => {
                    handleActivity();
                  }}
                  style={styles.actBtn}
                >
                  <Text style={styles.actBtnTxt}>View activity log</Text>
                  <RightArrow />
                </Pressable>
              </View>
            </View>
          )}
          <View style={styles.emptView} />

          <View style={{ width: "100%", padding: moderateScale(20) }}>
            <View style={styles.listHead}>
              <ListPaperIcon />
              <Text style={styles.listHeadTitle}>Subscription Information</Text>
            </View>
            <RowView
              desc={data?.user_subscription?.referral_no}
              title={"Subscription ID"}
              key={"subId"}
            />
            <RowView
              desc={formattedStartDate}
              title={"Coverage Start Date"}
              key={"startdate"}
            />
            <RowView
              desc={formattedEndDate}
              title={"Coverage End Date"}
              key={"enddate"}
            />
          </View>
          <View style={styles.emptView} />
          <View style={{ width: "100%", padding: moderateScale(20) }}>
            <View style={styles.listHead}>
              <ListIcon />
              <Text style={styles.listHeadTitle}>Membership Benefits</Text>
            </View>
            <View style={[styles.subsDetails, { justifyContent: "" }]}>
              <CheckBoxIcon2 />
              <Text style={styles.memTxt}>
                {totalEmerCalls} x Emergency Trips
              </Text>
              <InfoIcon3 />
            </View>
            <View style={[styles.subsDetails, { justifyContent: "" }]}>
              <CheckBoxIcon2 />
              <Text style={styles.memTxt}>
                {totalNonEmerCalls} x Non-Emergency Trips
              </Text>
              <InfoIcon3 />
            </View>
            {otherBenefits?.map((item, index) => (
              <View
                style={[styles.subsDetails, { justifyContent: "" }]}
                key={index}
              >
                <CheckBoxIcon2 />
                <Text style={styles.memTxt}>{item?.benefit_description}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardMain: {
    width: "100%",
    alignItems: "center",
    paddingTop: verticalScale(20),
  },
  card: {
    width: "100%",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    borderColor: CustomColors.neutralgrey_200,
    backgroundColor: CustomColors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Offset
    shadowOpacity: 0.1, // Opacity
    shadowRadius: 8, // Blur radius
    // Android shadow properties
    elevation: 4, // Elevation level (can be adjusted)l
    padding: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  actBtnContainer: {
    display: "flex",
    alignItems: "center",
  },
  subsTxt: {
    fontFamily: CustomFonts.PoppinsMedium,
    fontWeight: "500",
    fontSize: CustomFontSize.txt_18,
    color: CustomColors.neutral_700,
  },
  subsContent: {
    width: "100%",
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
  },
  cont1: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: moderateScale(16),
    marginBottom: moderateScale(12),
  },
  cont2: { flexDirection: "row", alignItems: "center" },
  conTxt: {
    color: CustomColors.new_theme_clr,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    paddingHorizontal: horizontalScale(10),
  },
  emptView: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    borderWidth: moderateScale(4),
    width: "100%",
    borderColor: CustomColors.neutral_100,
  },
  listHead: {
    flexDirection: "row",
    paddingBottom: verticalScale(10),
    alignItems: "center",
  },
  listHeadTitle: {
    paddingHorizontal: horizontalScale(10),
    fontFamily: CustomFonts.PoppinsMedium,
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.txt_18,
    fontWeight: "500",
  },
  titleLft: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontsize: CustomFontSize.normal,
    color: CustomColors.neutral_700,
  },
  titleRht: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
  },
  subsDetails: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingVertical: verticalScale(5),
    alignItems: "center",
  },
  memTxt: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontsize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
    paddingHorizontal: horizontalScale(10),
    paddingRight: horizontalScale(5),
  },
  actBtn: {
    width: verticalScale(170),
    height: moderateScale(34),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    borderColor: CustomColors.new_theme_clr,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  actBtnTxt: {
    fontFamily: CustomFonts.PoppinsRegular,
    color: CustomColors.new_theme_clr,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    paddingHorizontal: verticalScale(10),
  },
});
