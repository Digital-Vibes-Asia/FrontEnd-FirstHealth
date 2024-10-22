import {Pressable, StyleSheet, Text, View} from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';

export default function StartingPageTxt({txt}) {
  return <Text style={styles.boldtextstyle}>{txt}</Text>;
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.white,
    fontSize: CustomFontSize.large_title,
    fontFamily: CustomFonts.PoppinsRegular,
    color: CustomColors.white,
    lineHeight: verticalScale(28),
    // textAlign: 'center',     
  },
});
