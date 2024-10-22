import { useState } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function LargeTextInput({ hint, onChangeText, value, title }) {
  const [isFocused, setIsFocused] = useState(false); // Focus state for the TextInput

  return (
    <>
      <Text style={styles.textstyle}>{title}</Text>
      <View style={[
        styles.container,
        { borderColor: isFocused ? '#5525A5' : CustomColors.bordercolour , borderWidth: isFocused? moderateScale(2):moderateScale(1) } // Change border color on focus
      ]}>
        <TextInput
          style={styles.textinput}
          placeholder={hint}
          multiline={true}
          value={value}
          placeholderTextColor={CustomColors.hintcolour}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}   // Set focus state to true
          onBlur={() => setIsFocused(false)}   // Set focus state to false
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textinput: {
    color: CustomColors.textcolour,
    paddingLeft: 25,
    paddingRight: 10,
    paddingVertical: 10,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular
  },
  textstyle: {
    marginBottom: 10,
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.RobotoSlabBold
  },
  container: {
    minHeight: 170,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: CustomColors.bordercolour,  // Default border color
  },
});
