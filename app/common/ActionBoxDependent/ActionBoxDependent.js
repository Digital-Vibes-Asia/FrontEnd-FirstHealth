import { TextInput, StyleSheet, View, Pressable, Text } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/common/Metrics";
import UserIcon from "../../assets/icon/userIcon.svg";
import UserIcon2 from "../../assets/icon/avatar.svg";
import LinearGradient from "react-native-linear-gradient";
import { ProgressBar } from "react-native-paper";
import ReferralCodeButton from "../Button/referralCodeButton";
import Backbutton from "../../assets/icon/backbutton.svg";
import { useNavigation } from "@react-navigation/native";

export default function ActionBoxDependent({
  txt,
  refCode,
  contentHeight,
  screen,
  qualifyingPeriod,
  status,
  planName,
  qualifyLeft,
}) {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.mainContain}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 2 }}
          colors={[CustomColors.new_theme_clr, CustomColors.theme_clr]}
          style={[styles.container, { height: contentHeight }]}
        ></LinearGradient>
      </View>
      {screen === "dependantUserInvite" ||
      screen === "expired" ||
      screen === "manualRegistered" ? (
        <View
          style={{
            width: CustomDimensions.screenWidth,
            padding: moderateScale(20),
            paddingBottom:
              screen == "expired"
                ? 0
                : moderateScale(status === "inviteAccepted" ? 30 : 10),
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingBottom: moderateScale(20) }}
          >
            <Backbutton />
          </Pressable>
          <View style={styles.userContent}>
            <View style={{ width: "85%" }}>
              <Text
                numberOfLines={1}
                style={[styles.ttiletxt, { textAlign: "left" }]}
              >
                {txt}
              </Text>
              <Text style={[styles.subTile, { textAlign: "left" }]}>
                {planName}
              </Text>
            </View>
            <View>
              <UserIcon2 />
            </View>
          </View>
          {status === "inviteAccepted" ? (
            <ReferralCodeButton
              refCode={refCode}
              screen={screen}
              qualifyingPeriod={qualifyingPeriod}
            ></ReferralCodeButton>
          ) : null}
        </View>
      ) : (
        <View style={{ width: CustomDimensions.screenWidth }}>
          <View style={styles.iconView}>
            <Pressable onPress={() => navigation.navigate("MyProfile")}>
              <UserIcon
                width={CustomDimensions.icon_width_40}
                height={CustomDimensions.icon_height_40}
              ></UserIcon>
            </Pressable>
          </View>
          <Text style={styles.ttiletxt}>{txt}</Text>
          <Text style={styles.subTile}>{planName}</Text>
          {qualifyingPeriod === false ? (
            <View
              style={{ marginTop: "5%", width: "100%", alignItems: "center" }}
            >
              <ReferralCodeButton
                refCode={refCode}
                screen={screen}
                qualifyingPeriod={qualifyingPeriod}
              ></ReferralCodeButton>
            </View>
          ) : screen === "subsDependent" ||
            screen == "puExpired" ||
            screen === "subsExpired" ||
            qualifyingPeriod ? (
            <View
              style={{
                width: CustomDimensions.screenWidth,
                padding: moderateScale(20),
                paddingBottom: horizontalScale(0),
                paddingTop: moderateScale("puExpired" ? 5 : 20),
                alignItems: "center",
              }}
            >
              <ReferralCodeButton
                refCode={refCode}
                screen={screen}
                qualifyingPeriod={qualifyingPeriod}
                qualifyLeft={qualifyLeft}
              ></ReferralCodeButton>
            </View>
          ) : null}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  mainContain: {
    ...StyleSheet.absoluteFillObject, // Make this view fill the container
    backgroundColor: "white",
    position: "absolute",
  },
  container: {
    backgroundColor: CustomColors.new_theme_clr,
    borderWidth: moderateScale(1),
    flexDirection: "row",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },

  ttiletxt: {
    color: CustomColors.white,
    fontSize: 18,
    fontFamily: CustomFonts.PoppinsMedium,
    fontWeight: "500",
    textAlign: "center",
  },
  iconView: {
    alignItems: "flex-end",
    width: CustomDimensions.screenWidth,
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(8),
  },
  subTile: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: CustomFontSize.normal,
    fontWeight: "400",
    textAlign: "center",
    color: CustomColors.white,
  },
  userContent: {
    paddingVertical: verticalScale(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
