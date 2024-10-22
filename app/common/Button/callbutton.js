import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';
import CallIcon from "../../assets/icon/callwhite.svg"

export default function CallButton({ onPress, value }) {

  return (
    <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        android_ripple={styles.ripple_colour}
        onPress={onPress}>
        <View style={{ marginRight: verticalScale(10) }}>
          <CallIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></CallIcon>
        </View>
        <Text style={styles.button}>{value}</Text>

      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.new_theme_clr,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(32),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  whole_container: {
    margin: verticalScale(10),


  },
  button: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    alignSelf: 'center',
    lineHeight: verticalScale(19),
  },
});
