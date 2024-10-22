import { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';

export default function WhDoubleInputBox({
  hint,
  onChangeText,
  value,
  hint2,
  onChangeText2,
  value2,
  editable,
  editable1,
}) {
  const [isFocused1, setIsFocused1] = useState(false);  // Focus state for the first input
  const [isFocused2, setIsFocused2] = useState(false);  // Focus state for the second input

  return (
    <>
      <View style={styles.whole_container}>
        <View style={styles.single_container}>
          <TextInput
            style={[
              styles.textinput,
              {
                borderColor: isFocused1 ? CustomColors.focusColor : CustomColors.neutral_200, borderWidth: isFocused1? moderateScale(2):moderateScale(1)  // Dynamic border color for first input
              },
            ]}
            placeholder={hint}
            value={value}
            editable={editable}
            inputMode="decimal"
            placeholderTextColor={CustomColors.neutral_400}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused1(true)} // Handle focus for first input
            onBlur={() => setIsFocused1(false)} // Handle blur for first input
          />
        </View>

        <View style={[styles.single_container, { marginLeft: verticalScale(10) }]}>
          <TextInput
            style={[
              styles.textinput,
              {
                borderColor: isFocused2 ? CustomColors.focusColor : CustomColors.neutral_200, borderWidth: isFocused2? moderateScale(2):moderateScale(1)  // Dynamic border color for second input
              },
            ]}
            placeholder={hint2}
            value={value2}
            editable={editable1}
            inputMode="text"
            placeholderTextColor={CustomColors.neutral_400}
            onChangeText={onChangeText2}
            onFocus={() => setIsFocused2(true)} // Handle focus for second input
            onBlur={() => setIsFocused2(false)} // Handle blur for second input
          />
        </View>
      </View>
    </>
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
    color: CustomColors.txt,
  },
  whole_container: {
    marginBottom: verticalScale(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  single_container: {
    flex: 1,
  },
});
