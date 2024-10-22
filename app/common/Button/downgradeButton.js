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

export default function DowngradeButton({ onPress, value }) {
  return (
    <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        android_ripple={styles.ripple_colour}
        onPress={onPress}
      >
        <Text style={styles.button}>{value}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: CustomColors.theme_clr,
    padding: verticalScale(12),
    borderRadius: moderateScale(32),
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    // lineHeight: verticalScale(19),
    paddingRight:horizontalScale(10)
  },
});
