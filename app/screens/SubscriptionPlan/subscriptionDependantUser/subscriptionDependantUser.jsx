import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from "../../../utils/common/CustomStyles";
import { ScrollView } from "react-native";
import ProgressBox from "../../../common/ProgressBox/progressBox";
import RightArrow from "../../../assets/icon/rightArrow4.svg";
import ListPaperIcon from "../../../assets/icon/listPaperIcon.svg";
import ListIcon from "../../../assets/icon/menu.svg";
import CheckBoxIcon2 from "../../../assets/icon/check_circle.svg";
import InfoIcon3 from "../../../assets/icon/infoIcon3.svg";
import ActionBoxDependent from "../../../common/ActionBoxDependent/ActionBoxDependent";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utils/common/Metrics";
import AlertIcon from "../../../assets/icon/cautionIcon.svg";
import MemButton from "../../../common/Button/MemButton";
import DowngradeButton from "../../../common/Button/downgradeButton";
import moment from "moment";
import { usePostMutation } from "../../../store/api";
import { UrlBase } from "../../../utils/common/urlbase";
import { useSelector } from "react-redux";
import DowngradeAlert from "../../../common/Dialogs/DownGradeAlert";

export default function SubscriptionDependantUser({ data, fetching }) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const isPlanExpired = data?.user_subscription?.is_plan_expired;
  const isRemoved = data?.user_subscription?.is_removed;
  const isDependent = data?.user_subscription?.is_dependent;
  const isQualifying = data?.user_subscription?.is_qualifying_period;
  const isQualifyingLeft =
    data?.user_subscription?.days_left_in_qualifying_period;

  const totalEmerCalls = data?.user_subscription?.t_emergency_calls || 0;
  const totalNonEmerCalls = data?.user_subscription?.t_clinic_calls || 0;

  // const refNo = data?.user_subscription?.referral_no;

  // const reg_id = useSelector(state => state.operation?.temp_regid);
  const reg_id = useSelector(
    (state) => state.operation.authentication.user.reg_id
  );

  const [GetPlan, { data: dependantData, error: planerror }] =
    usePostMutation();

  const dependantName = data?.user_subscription?.name;
  const dependantEmail = data?.user_subscription?.email;
  const dependantPlan = data?.user_subscription?.subscription_master?.plan;
  const benefits = data?.user_subscription?.subscription_master?.benefits;
  const referralId = data?.principl_user?.referral_no;

  // Date Conversions
  const startDate = dependantData?.user_subscription?.start_date;
  const endDate = dependantData?.user_subscription?.end_date;

  const formattedStartDate = moment(startDate).format("DD MMMM YYYY");
  const formattedEndDate = moment(endDate).format("DD MMMM YYYY");

  useEffect(() => {
    GetPlan({
      data: {
        dependent_id: reg_id,
      },
      url: UrlBase.GETDEPENDETAILS,
    });
  }, [reg_id]);

  function SubscriptionInformations() {
    return (
      <View style={{ width: "100%" }}>
        <View style={styles.emptView} />

        <View style={{ width: "100%", padding: 20 }}>
          <View style={styles.listHead}>
            <ListPaperIcon
              width={CustomDimensions.icon_width_20}
              height={CustomDimensions.icon_height_20}
            />
            <Text style={styles.listHeadTitle}>Subscription Information</Text>
          </View>
          <View style={styles.subsDetails}>
            <Text style={styles.titleLft}>Subscription ID</Text>
            <Text style={styles.titleRht}>{referralId}</Text>
          </View>

          <View style={styles.subsDetails}>
            <Text style={styles.titleLft}>Coverage Start Date</Text>
            <Text style={styles.titleRht}>{formattedStartDate}</Text>
          </View>

          <View style={styles.subsDetails}>
            <Text style={styles.titleLft}>Coverage End Date</Text>
            <Text style={styles.titleRht}>{formattedEndDate}</Text>
          </View>
        </View>
        <View style={styles.emptView} />
        <View style={{ width: "100%", padding: 20 }}>
          <View style={styles.listHead}>
            <ListIcon
              width={CustomDimensions.icon_width_20}
              height={CustomDimensions.icon_height_20}
            />
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
          {benefits.map((item, index) => (
            <View
              style={[styles.subsDetails, { justifyContent: "" }]}
              key={index}
            >
              <CheckBoxIcon2 />
              <Text style={styles.memTxt}>{item.benefit_description}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: CustomColors.grey_bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        bounces={false}
      >
        <ActionBoxDependent
          txt={dependantName}
          planName={dependantPlan}
          refCode={referralId}
          screen={
            isDependent
              ? "subsDependent"
              : isPlanExpired
              ? "subsExpired"
              : isRemoved
              ? "subsRevoked "
              : null
          }
          contentHeight={isDependent ? 313 : 353}
        ></ActionBoxDependent>
        {isRemoved ? (
          <View style={styles.cardMain}>
            <View style={styles.card}>
              <AlertIcon />
              <Text style={styles.subsTxt}>Membership Change</Text>
              <Text style={styles.subsContent}>
                You have been removed from your primary user’s plan and have
                been moved to a{" "}
                <Text style={[styles.subsContent, { fontWeight: "600" }]}>
                  {" "}
                  Free Membership Plan.
                </Text>
              </Text>

              <Text
                style={[
                  styles.subsContent,
                  { paddingVertical: verticalScale(10) },
                ]}
              >
                For continued access to benefits, please subscribe to a new plan
                or contact our{" "}
                <Text
                  style={[
                    styles.subsContent,
                    { color: CustomColors.new_theme_clr },
                  ]}
                >
                  {" "}
                  First Health Customer Service{" "}
                </Text>
                for more information.
              </Text>

              <View style={{ marginTop: "5%", width: "100%" }}>
                <MemButton
                  value={"Upgrade Plan"}
                  onPress={() => {
                    navigation.navigate("subp", { screen: "dependantUser" });
                  }}
                ></MemButton>
              </View>

              <View style={{ marginTop: "5%", width: "100%" }}>
                <DowngradeButton
                  value={"Downgrade to Free Plan"}
                  onPress={() => {
                    setVisible(!visible);
                  }}
                ></DowngradeButton>
              </View>
            </View>
          </View>
        ) : isPlanExpired ? (
          <View style={styles.cardMain}>
            <View style={styles.card}>
              <AlertIcon />
              <Text style={styles.subsTxt}>Subscription Expired</Text>
              <Text style={styles.subsContent}>
                Your primary user's subscription has expired. For continued
                access to benefits, please contact your primary user, subscribe
                to a new plan, or{" "}
                <Text
                  style={[
                    styles.subsContent,
                    { color: CustomColors.new_theme_clr },
                  ]}
                >
                  call our support center{" "}
                </Text>
                for more information.
              </Text>

              <View style={{ marginTop: "5%", width: "100%" }}>
                <MemButton
                  value={"Subscription to new Plan"}
                  onPress={() => {
                    navigation.navigate("subp", { screen: "dependantUser" });
                  }}
                ></MemButton>
              </View>

              <View style={{ marginTop: "5%", width: "100%" }}>
                <DowngradeButton
                  value={"Downgrade to Free Plan"}
                  onPress={() => {
                    setVisible(!visible);
                  }}
                ></DowngradeButton>
              </View>
            </View>
          </View>
        ) : isQualifying ? (
          <View style={styles.cardMain}>
            <View style={styles.card}>
              <AlertIcon />
              <Text style={styles.subsTxt}>Qualifying Period in Progress</Text>
              <Text style={styles.subsContent}>
                You have{" "}
                <Text style={[styles.subsContent, { fontWeight: "600" }]}>
                  {" "}
                  {isQualifyingLeft} days remaining in the Qualifying Period.
                </Text>{" "}
                This is a standard review process to ensure all details are
                correct. During this time, you and any dependants are not yet
                entitled to utilize member benefits.{" "}
              </Text>
              <Text
                style={[styles.subsContent, { paddingTop: verticalScale(15) }]}
              >
                You will be notified once your membership is fully active. Thank
                you for your patience.
              </Text>
            </View>
            <SubscriptionInformations />
          </View>
        ) : (
          <View style={styles.twoBox}>
            <View style={{ width: "92%" }}>
              <ProgressBox screen={"subsDependant"} data={data} />
            </View>
            <View style={{ padding: 20 }}>
              <Pressable
                onPress={() => {
                  "";
                }}
                style={styles.actBtn}
              >
                <Text style={styles.actBtnTxt}>View activity log</Text>
                <RightArrow />
              </Pressable>
            </View>
            <SubscriptionInformations />
          </View>
        )}
      </ScrollView>
      <DowngradeAlert
        setModalVisible={setVisible}
        modalVisible={visible}
        fetching={fetching}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  twoBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: verticalScale(40),
  },
  actBtn: {
    width: moderateScale(170),
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
    paddingHorizontal: horizontalScale(10),
  },
  emptView: {
    borderWidth: moderateScale(4),
    width: "100%",
    borderColor: CustomColors.neutral_100,
  },
  listHead: {
    flexDirection: "row",
    paddingBottom: verticalScale(5),
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
    justifyContent: "space-between",
    paddingVertical: verticalScale(5),
    alignItems: "center",
  },
  memTxt: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontsize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
    paddingHorizontal: horizontalScale(10),
  },
  cardMain: {
    width: "100%",
    alignItems: "center",
    paddingTop: verticalScale(20),
  },
  card: {
    width: "90%",
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
    marginBottom: verticalScale(20),
  },
  subsTxt: {
    fontFamily: CustomFonts.PoppinsMedium,
    fontWeight: "500",
    fontSize: CustomFontSize.txt_18,
    color: CustomColors.neutral_700,
    paddingVertical: verticalScale(15),
  },
  subsContent: {
    width: "100%",
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
  },
});
