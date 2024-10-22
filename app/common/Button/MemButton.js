import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from "../../utils/common/Metrics";
import RightArrow from "../../assets/icon/rightarrow2.svg";
import ExitIcon from "../../assets/icon/exitIcon.svg";
import MailIcon from "../../assets/icon/mailicon.svg";

export default function MemButton({ onPress, value, buttonScreen }) {
  return (
    <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        android_ripple={styles.ripple_colour}
        onPress={onPress}
      >
        <Text style={styles.button}>{value}</Text>
        {buttonScreen === "inviteSent" ? (
          <MailIcon style={{ marginLeft: 10 }} />
        ) : buttonScreen === "inviteRejected" ? (
          <ExitIcon style={{ marginLeft: horizontalScale(20) }} />
        ) : (
          <RightArrow
            width={CustomDimensions.icon_height_25}
            height={CustomDimensions.icon_height_25}
          />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderColor: CustomColors.theme_clr,
    padding: verticalScale(12),
    borderRadius: CustomDimensions.brad_32,
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CustomColors.new_theme_clr,
  },

  whole_container: {
    // margin: CustomDimensions.mar_10,
  },

  button: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    // lineHeight: verticalScale(19),
    paddingLeft: horizontalScale(10),
  },
});
