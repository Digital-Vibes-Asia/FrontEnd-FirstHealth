import { useState } from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFonts, CustomFontSize } from '../../utils/common/CustomFont';

export default function AppoinmentInputBox({
  hint,
  onChangeText,
  value,
  title,
}) {
  const [isFocused, setIsFocused] = useState(false); // Focus state

  return (
    <>
      <Text style={styles.textstyle}>{title}</Text>
      <TextInput
        style={[
          styles.textinput,
          {
            borderColor: isFocused ? CustomColors.focusColor : CustomColors.bordercolour,  borderWidth: isFocused? moderateScale(2):moderateScale(1) // Dynamic border color
          },
        ]}
        placeholder={hint}
        value={value}
        placeholderTextColor={CustomColors.hintcolour}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)} // Set focus to true
        onBlur={() => setIsFocused(false)} // Set focus to false when input is blurred
      />
    </>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderWidth: 1,
    paddingLeft: 25,
    paddingRight: 10,
    borderRadius: 10,
    paddingVertical: 10,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
    color: CustomColors.textcolour,
  },
  textstyle: {
    marginBottom: 10,
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.RobotoSlabBold,
  },
});
