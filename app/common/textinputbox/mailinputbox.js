import { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';

export default function MailInputBox({ hint, onChangeText, value, title, desc, error, madatory }) {
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  return (
    <>
      <View style={{ marginBottom: verticalScale(10) }}>
        <Text style={styles.titletxt}>{title} {madatory && <Text style={[styles.titletxt, { color: CustomColors.error_red }]}>*</Text>}</Text>
        <TextInput
          style={[
            styles.textinput,
            { borderColor: isFocused ? '#5525A5' : CustomColors.neutral_200, borderWidth: isFocused? moderateScale(2):moderateScale(1)  } // Change border color on focus
          ]}
          placeholder={hint}
          value={value}
          inputMode={"email"}
          placeholderTextColor={CustomColors.neutral_400}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}   // Set focus state to true
          onBlur={() => setIsFocused(false)}   // Set focus state to false
        />
        {error &&
          <Text style={[styles.desctxt, { color: error ? CustomColors.red : CustomColors.lighttheme }]}>{desc}</Text>
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderColor: CustomColors.neutral_200, // Default border color
    color: CustomColors.txt,
    borderWidth: moderateScale(1),
    paddingLeft: horizontalScale(20),
    paddingRight: horizontalScale(10),
    borderRadius: moderateScale(8),
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(5),
  },
  titletxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    marginBottom: verticalScale(5),
    lineHeight: verticalScale(18),
  },
  desctxt: {
    color: CustomColors.error_red,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
  },
});
