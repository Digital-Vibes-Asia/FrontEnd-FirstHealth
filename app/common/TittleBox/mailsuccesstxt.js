import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';

export default function MailSuccessTxt({ txt1, txt2, txt3 }) {
  return <Text style={styles.boldtextstyle}>{txt1}<Text style={styles.mailstyle}>{txt2}</Text> <Text style={styles.boldtextstyle}>{txt3}</Text>

  </Text>;
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
    textAlign:"center"

  },
  mailstyle: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(18),
    textAlign:"center",
    marginHorizontal: 5,
  },
});
