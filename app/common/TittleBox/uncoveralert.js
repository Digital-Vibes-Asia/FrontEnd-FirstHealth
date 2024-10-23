import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';

export default function UncoverAlert({ txt }) {
  return <Text style={styles.boldtextstyle}>{txt}</Text>;
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(19),
    textAlign: 'center',     
  },
});