import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';
import ManualRegister from "../../assets/icon/manualregister.svg"

export default function ManualRegisterButton({ onPress, value }) {

  return (
    <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        onPress={onPress}>
        <Text style={styles.button}>{value}</Text>
        <View style={styles.button_position}>
          <ManualRegister width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></ManualRegister>
        </View>
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

    // alignContent:"space-evenly"
    justifyContent: "center",
    // alignItems: "flex-end",
  },

  whole_container: {
    // margin: verticalScale(10),


  },
  button: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    alignSelf: 'center',
    lineHeight: verticalScale(19),
  },
  button_position: {
    marginLeft: verticalScale(5),
    position: "absolute",
    right: 0,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),


  }
});
