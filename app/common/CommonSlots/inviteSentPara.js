import { Alert, StyleSheet, Text, View } from "react-native";
import {
  CustomColors,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import { moderateScale, verticalScale } from "../../utils/common/Metrics";
import ActionBoxDependent from "../ActionBoxDependent/ActionBoxDependent";
import MailIcon from "../../assets/icon/mailIcon2.svg";
import MemButton from "../Button/MemButton";
import { UrlBase } from "../../utils/common/urlbase";
import { usePostMutation } from "../../store/api";
import { useEffect } from "react";

export default function InviteSent({ data, referralNo }) {
  const email = data?.email ? data?.email : data?.to_mail;
  const depenType = data?.type_dependant;

  const plan = data?.subscription_master?.plan
    ? data?.subscription_master?.plan
    : data?.type_dependant === "Adult"
    ? "Adult Membership"
    : "Senior Membership";

  const [dispatch, { data: emailData, error }] = usePostMutation();

  const handleMailSend = () => {
    dispatch({
      data: { email: email, type_dependant: depenType },
      url: UrlBase.EMAIL_SENT,
    });
  };

  useEffect(() => {
    if (emailData) {
      Alert.alert(
        emailData?.message ? emailData?.message : "Mail sent successfully!"
      );
    } else if (error) {
      Alert.alert(JSON.stringify(error?.data?.message));
    }
  }, [emailData, error]);
  return (
    <View>
      <ActionBoxDependent
        txt={email}
        planName={plan}
        refCode={data?.referral_no}
        screen={"dependantUserInvite"}
        status={"inviteRejected"}
        contentHeight={330}
      ></ActionBoxDependent>

      <View style={styles.cardMain}>
        <View style={styles.card}>
          <MailIcon />
          <Text style={styles.subsTxt}>Email invite sent</Text>
          <Text style={styles.subsContent}>
            An email invite has been sent to:{" "}
            <Text style={styles.subsContent1}>{email} </Text>
          </Text>

          <Text
            style={[styles.subsContent, { paddingVertical: verticalScale(10) }]}
          >
            To be added to your membership plan as a dependant, they must sign
            up for a First Health account using the referral ID{" "}
            <Text style={styles.subsContent1}>{referralNo}</Text>
          </Text>
          <View style={{ marginTop: "5%", width: "100%" }}>
            <MemButton
              value={"Re-send email"}
              buttonScreen={
                data.is_accepted === 0 ? "inviteSent" : "inviteRejected"
              }
              onPress={() => handleMailSend()}
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
    width: "90%",
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
    width: "100%",
  },
  subsContent1: {
    color: CustomColors.neutral_600,
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontSize: CustomFontSize.normal,
    width: "100%",
  },
});
