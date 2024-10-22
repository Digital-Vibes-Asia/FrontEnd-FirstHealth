import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';

export default function RegistertitleBox({ txt, txt1,onPress }) {

  return <View style={{flexDirection:'row'}}>
    <Text style={styles.normaltextstyle}>{txt}
    </Text>
    <Pressable onPress={onPress}>
    <Text style={styles.boldtextstyle}>{txt1} </Text>
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(18)
  },
  normaltextstyle: {
    color: CustomColors.neutral_500,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
    marginLeft: horizontalScale(5),
    marginRight: horizontalScale(5),
    
  },
});


