import { StyleSheet, View, Image } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';
import CheckIcon from "../../assets/icon/check.svg"
import Lock from "../../assets/icon/lockicon.svg"
import Key from '../../assets/icon/keyicon.svg'
import Mail from "../../assets/icon/mailicontheme.svg"


export default function MailBox() {
  return (
    <View style={styles.container}>
      <Mail width={CustomDimensions.icon_width_30} height={CustomDimensions.icon_height_30}></Mail>
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
    alignItems:"center",
   
  },


});
