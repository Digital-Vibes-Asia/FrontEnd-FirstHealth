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
import PlusIcon from "../../assets/icon/plusIcon2.svg";

export default function ExpandButton({ onPress, value, expand }) {
  return (
    <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        android_ripple={styles.ripple_colour}
        onPress={onPress}
      >
        <Text style={styles.button}>{value}</Text>
        {expand ? (
          <Text
            style={{
              color: CustomColors.new_theme_clr,
            }}
          >
            -
          </Text>
        ) : (
          <PlusIcon />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: CustomColors.theme_clr,
    padding: verticalScale(12),
    borderRadius: CustomDimensions.brad_32,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  whole_container: {
    // margin: CustomDimensions.mar_10,
    marginVertical:verticalScale(10)
  },

  button: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    // lineHeight: verticalScale(19),
    paddingRight:horizontalScale(10)
  },
});
