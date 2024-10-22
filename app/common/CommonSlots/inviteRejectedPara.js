import { Alert, StyleSheet, Text, View } from "react-native";
import {
  CustomColors,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import { moderateScale, verticalScale } from "../../utils/common/Metrics";
import ActionBoxDependent from "../ActionBoxDependent/ActionBoxDependent";
import AlertIcon from "../../assets/icon/cautionIcon.svg";
import MemButton from "../Button/MemButton";
import { UrlBase } from "../../utils/common/urlbase";
import { useEffect } from "react";
import { usePostMutation } from "../../store/api";
import { useNavigation } from "@react-navigation/native";

export default function InviteRejected({ details, referralNo }) {
  const email = details?.email ? details?.email : details?.to_mail;

  const navigation = useNavigation();

  const plan = details?.subscription_master?.plan
    ? details?.subscription_master?.plan
    : details?.type_dependant === "Adult"
      ? "Adult Membership"
      : "Senior Membership";

  const userId = details?.id;

  const [dispatch, { data, error }] = usePostMutation();


  const handleSlots = () => {
    dispatch({
      url: UrlBase.RELEASESLOTS + `${userId}`,
    });
  };

  useEffect(() => {
    if (data) {
      navigation.navigate("main", {
        screen: "Subscription",
      });
    } else if (error) {
      Alert.alert(JSON.stringify(error?.data?.message));
    }
  }, [data, error]);

  return (
    <View>
      <ActionBoxDependent
        txt={email}
        planName={plan}
        refCode={referralNo}
        screen={"dependantUserInvite"}
        status={"inviteRejected"}
        contentHeight={330}
      ></ActionBoxDependent>

      <View style={styles.cardMain}>
        <View style={styles.card}>
          <AlertIcon />
          <Text style={styles.subsTxt}>Invite was rejected</Text>
          <Text style={styles.subsContent}>
            Your email invite to{" "}
            <Text style={styles.subsContent1}>{email}</Text> has been rejected.
            They may have chosen to subscribe to their own plan.
          </Text>

          <Text
            style={[styles.subsContent, { paddingVertical: verticalScale(10) }]}
          >
            You can now release the slot to add a new user to your plan. If you
            have any questions or need assistance, please{" "}
            <Text style={{ color: CustomColors.new_theme_clr }}>
              contact our support center.
            </Text>
          </Text>

          <View style={{ marginTop: "5%", width: "100%" }}>
            <MemButton
              value={"Release Slot"}
              buttonScreen={"inviteRejected"}
              onPress={() => handleSlots()}
            ></MemButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardMain: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: moderateScale(328),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    borderColor: CustomColors.border_color,
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
  subsTxt: {
    fontFamily: CustomFonts.PoppinsMedium,
    fontWeight: "500",
    fontSize: CustomFontSize.txt_18,
    color: CustomColors.neutral_700,
    paddingVertical: verticalScale(15),
  },
  subsContent: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
  },
  subsContent1: {
    color: CustomColors.neutral_600,
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontSize: CustomFontSize.normal,
  },
});
