import { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';

export default function DoubleInputBox({ hint, onChangeText, value, title, desc, error, madatory, hint2, onChangeText2, value2, title2, desc2, error2, madatory2 }) {
  const [isFocused1, setIsFocused1] = useState(false); // Focus state for first input
  const [isFocused2, setIsFocused2] = useState(false); // Focus state for second input

  return (
    <>
      <View style={styles.whole_container}>
        <View style={styles.single_container}>
          <Text style={styles.titletxt}>{title} {madatory && <Text style={[styles.titletxt, { color: CustomColors.error_red }]}>*</Text>}</Text>
          <TextInput
            style={[
              styles.textinput,
              { borderColor: isFocused1 ? '#5525A5' : CustomColors.neutral_200, borderWidth: isFocused1? moderateScale(2):moderateScale(1)  } // Change border color on focus
            ]}
            placeholder={hint}
            value={value}
            inputMode={"text"}
            placeholderTextColor={CustomColors.neutral_400}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused1(true)}   // Set focus state for first input to true
            onBlur={() => setIsFocused1(false)}   // Set focus state for first input to false
          />
          {error &&
            <Text style={styles.desctxt}>{desc}</Text>
          }
        </View>

        <View style={[styles.single_container, { marginLeft: verticalScale(10) }]}>
          <Text style={styles.titletxt}>{title2} {madatory2 && <Text style={[styles.titletxt, { color: CustomColors.error_red }]}>*</Text>}</Text>
          <TextInput
            style={[
              styles.textinput,
              { borderColor: isFocused2 ? '#5525A5' : CustomColors.neutral_200, borderWidth: isFocused2? moderateScale(2):moderateScale(1)  } // Change border color on focus
            ]}
            placeholder={hint2}
            value={value2}
            inputMode={"text"}
            placeholderTextColor={CustomColors.neutral_400}
            onChangeText={onChangeText2}
            onFocus={() => setIsFocused2(true)}   // Set focus state for second input to true
            onBlur={() => setIsFocused2(false)}   // Set focus state for second input to false
          />
          {error2 &&
            <Text style={styles.desctxt}>{desc2}</Text>
          }
        </View>
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
  whole_container: {
    marginBottom: verticalScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  single_container: {
    flex: 1,
  },
});
