import { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';

export default function FhInputBox({ hint, onChangeText, value, editable }) {
  const [isFocused, setIsFocused] = useState(false); // Focus state

  return (
    <View>
      <TextInput
        style={[
          styles.textinput,
          {
            borderColor: isFocused ? CustomColors.focusColor : CustomColors.neutral_200, borderWidth: isFocused? moderateScale(2):moderateScale(1) // Dynamic border color
          },
        ]}
        placeholder={hint}
        value={value}
        editable={editable}
        inputMode={"text"}
        placeholderTextColor={CustomColors.bordercolour}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)} // Set focus to true
        onBlur={() => setIsFocused(false)} // Set focus to false when input is blurred
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderWidth: moderateScale(1),
    paddingLeft: horizontalScale(20),
    paddingRight: horizontalScale(10),
    borderRadius: moderateScale(8),
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(5),
  },
});
