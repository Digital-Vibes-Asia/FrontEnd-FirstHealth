import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';

export default function StepTxt({ txt }) {
  return <Text style={styles.boldtextstyle}>{txt}</Text>;
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.neutral_400,
    fontSize: CustomFontSize.small,
    fontFamily: CustomFonts.PoppinsLight,
    alignSelf: "center",
    lineHeight: verticalScale(14),
  },
});
