import { StyleSheet, View, Image } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';
import Mail from "../../assets/icon/thememail.svg"


export default function AlertMail() {
  return (
    <View style={styles.container}>
      <Mail width={CustomDimensions.icon_width_25} height={CustomDimensions.icon_height_25}></Mail>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: CustomColors.smiley_bg,
    width: horizontalScale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(60),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",

  },


});
