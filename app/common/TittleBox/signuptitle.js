import {Pressable, StyleSheet, Text, View} from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';

export default function SignupTitle({txt}) {
  return <Text style={styles.boldtextstyle}>{txt}</Text>;
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.neutral_800,
    fontSize: CustomFontSize.txt_22,
    fontFamily: CustomFonts.PoppinsRegular,
    // alignSelf:"center",
    textAlign:"center",
    lineHeight:verticalScale(26)
  },
});


