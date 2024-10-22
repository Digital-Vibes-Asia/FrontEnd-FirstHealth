import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';

export default function MorePlan({ txt, txt2 }) {
  return (
    <><Text style={styles.boldtextstyle}>{txt}

    </Text>
      <Text style={styles.mailtxt}>{txt2}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(14),
    textAlign: 'center',
  },
  mailtxt: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(14),
    textAlign: 'center',
    marginTop:verticalScale(5)

  }
});
