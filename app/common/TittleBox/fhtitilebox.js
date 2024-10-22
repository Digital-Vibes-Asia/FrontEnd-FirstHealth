import {Pressable, StyleSheet, Text, View} from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';

export default function FhtitleBox({txt,onPress}) {
  return (
  <Pressable onPress={onPress}>
   <Text style={styles.boldtextstyle}>{txt}</Text>
   </Pressable>
  )
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    // alignSelf:"center",
    // textAlign:"center",
    lineHeight:verticalScale(18)
  },
});


