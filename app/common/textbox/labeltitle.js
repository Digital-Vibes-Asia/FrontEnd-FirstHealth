import { TextInput, StyleSheet, View, Text } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';

export default function LabelTitle({ title, mandatory }) {
  return (
    <>
      <Text style={[styles.titletxt]}>{title} {mandatory && <Text style={[styles.titletxt, { color: CustomColors.error_red }]}>*</Text>}</Text>

    </>
  );
}

const styles = StyleSheet.create({

  titletxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    marginBottom: verticalScale(10),
    lineHeight: verticalScale(18),
  },

});
