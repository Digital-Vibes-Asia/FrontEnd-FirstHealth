import { Pressable, StyleSheet, Text, View } from "react-native";
import { CustomFonts, CustomDimensions } from "../../utils/common/CustomFont";
import ChainIcon from "../../assets/icon/chainIcon.svg";
import Info2 from "../../assets/icon/info2.svg";
import { CustomColors, CustomFontSize } from "../../utils/common/CustomStyles";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/common/Metrics";

export default function ReferralCodeButton({
  refCode,
  screen,
  qualifyingPeriod,
  qualifyLeft,
}) {
  return (
    <View>
      {screen === "subsExpired" || screen == "puExpired" ? (
        <Pressable
          style={[styles.container, { marginBottom: 10 }]}
          android_ripple={styles.ripple_colour}
        >
          <Text style={styles.button}>SUBSCRIPTION EXPIRED</Text>
        </Pressable>
      ) : null}
      {screen === "subsDependent" ||
      screen === "subsExpired" ||
      screen === "dependantUserInvite" ? (
        <Pressable
          style={[
            styles.container,
            {
              width:
                screen === "dependantUserInvite" ? moderateScale(184) : "auto",
            },
          ]}
          android_ripple={styles.ripple_colour}
        >
          <ChainIcon />
          <Text style={styles.button}>
            {"LINKED:"} {refCode}
          </Text>
          <Info2 />
        </Pressable>
      ) : null}
      {screen === "puqaa" && qualifyingPeriod === true ? (
        <Pressable
          style={styles.container}
          android_ripple={styles.ripple_colour}
        >
          <Text style={styles.button}>
            QUALIFYING PERIOD: {qualifyLeft}{" "}
            {qualifyLeft === 1 ? "DAY" : "DAYS"} LEFT
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.light_sandle,
    padding: CustomDimensions.pad_5,
    borderRadius: CustomDimensions.brad_32,
    width: "auto",
    height: moderateScale(32),
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    color: CustomColors.sandle,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    alignSelf: "center",
    fontWeight: "600",
    paddingHorizontal: verticalScale(10),
  },
  ripple_colour: {
    color: CustomColors.ripple_colour,
  },
});
