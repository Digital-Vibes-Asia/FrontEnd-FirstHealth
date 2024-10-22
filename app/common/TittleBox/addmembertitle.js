import {Pressable, StyleSheet, Text, View} from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';

export default function AddmemberTitle({txt,txt2}) {
  return <>
  <Text style={styles.boldtextstyle}>{txt}</Text>
  <Text style={styles.smalltxt}>{txt2}</Text>
  </>
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    // alignSelf:"center",
    textAlign:"center",
    lineHeight:verticalScale(18)
  },
  smalltxt: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.txt_10,
    fontFamily: CustomFonts.PoppinsRegular,
    // alignSelf:"center",
    textAlign:"center",
    lineHeight:verticalScale(12)
  },
});


