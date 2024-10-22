import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomFonts, CustomFontSize, CustomDimensions } from '../../utils/common/CustomFont';

export default function UserInputBox({ hint, onChangeText, value }) {
  const [isFocused, setIsFocused] = useState(false); // Focus state

  return (
    <>
      <TextInput
        style={[
          styles.textinput,
          {
            borderColor: isFocused ? '#5525A5' : CustomColors.bordercolour, borderWidth: isFocused? moderateScale(2):moderateScale(1)  // Dynamic border color
          },
        ]}
        placeholder={hint}
        value={value}
        inputMode={"email"}
        placeholderTextColor={CustomColors.hintcolour}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}  // Handle focus state
        onBlur={() => setIsFocused(false)}  // Handle blur state
      />
    </>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderColor: CustomColors.bordercolour, // Default border color
    color: CustomColors.textcolour,
    borderWidth: CustomDimensions.bwidth_2,
    paddingLeft: CustomDimensions.pad_25,
    paddingRight: CustomDimensions.pad_10,
    borderRadius: CustomDimensions.brad_10,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
    paddingVertical: CustomDimensions.pad_10,
  },
});
