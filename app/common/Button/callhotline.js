import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';
import MailIcon from "../../assets/icon/mailicon.svg"
import SentInvite from "../../assets/icon/sentinvite.svg"
import Themecall from "../../assets/icon/calltheme.svg"

export default function CallHotlineButton({ onPress, value }) {

  return (
    <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        onPress={onPress}>
        <Text style={styles.button}>{value}</Text>
        <View style={styles.button_position}>
          <Themecall width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Themecall>
        </View>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: CustomColors.new_theme_clr,
    borderWidth: 1,
    borderColor: CustomColors.new_theme_clr,
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
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    alignSelf: 'center',
    lineHeight: verticalScale(19),
  },
  button_position: {
    marginLeft: verticalScale(5),
    position: "absolute",
    left: 0,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),


  }
});
