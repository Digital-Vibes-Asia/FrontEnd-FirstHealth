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
import PlusIcon from "../../assets/icon/plusicon.svg";

export default function JoinPlanButton({ onPress, value }) {
  return (
    <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        android_ripple={styles.ripple_colour}
        onPress={onPress}
      >
        <Text style={styles.button}>{value}</Text>
        <PlusIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.white,
    padding: moderateScale(15),
    borderRadius: moderateScale(32),
    borderColor: CustomColors.new_theme_clr,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  whole_container: {
    // margin: verticalScale(10),
  },
  button: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    alignSelf: "center",
    lineHeight: verticalScale(19),
    fontWeight: "600",
  },
});
