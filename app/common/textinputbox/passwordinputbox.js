import { useState } from "react";
import { TextInput, StyleSheet, View, Text, Pressable } from "react-native";
import {
  CustomColors,
  CustomFontSize,
  CustomFonts,
  CustomDimensions,
} from "../../utils/common/CustomStyles";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/common/Metrics";
import EyeIcon from "../../assets/icon/eyeIcon.svg";
import EyeIcon2 from "../../assets/icon/eyeIconSlash.svg";

export default function PasswordInputBox({
  hint,
  onChangeText,
  value,
  title,
  desc,
  error,
  madatory,
  onPressIn,
  eye,
  onPressOut,
}) {
  const [isFocused, setIsFocused] = useState(false); // Focus state

  return (
    <>
      <View style={{ marginBottom: verticalScale(5) }}>
        <Text style={styles.titletxt}>
          {title}{" "}
          {madatory && (
            <Text style={[styles.titletxt, { color: CustomColors.error_red }]}>
              *
            </Text>
          )}
        </Text>
        <View
          style={[
            styles.container,
            {
              borderColor: isFocused ? '#5525A5' : CustomColors.neutral_200, borderWidth: isFocused? moderateScale(2):moderateScale(1)  // Dynamic border color
            },
          ]}
        >
          <TextInput
            style={styles.textinput}
            placeholder={hint}
            value={value}
            inputMode={"text"}
            multiline={false}
            secureTextEntry={eye}
            placeholderTextColor={CustomColors.neutral_400}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)} // Set focus state to true
            onBlur={() => setIsFocused(false)} // Set focus state to false
          />
          <Pressable
            style={{
              paddingHorizontal: CustomDimensions.pad_20,
              paddingVertical: moderateScale(3),
            }}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            {eye ? <EyeIcon /> : <EyeIcon2 />}
          </Pressable>
        </View>
        {error && (
          <Text
            style={[
              styles.desctxt,
              { color: error ? CustomColors.red : CustomColors.lighttheme },
            ]}
          >
            {desc}
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textinput: {
    color: CustomColors.txt,
    paddingLeft: horizontalScale(20),
    paddingRight: horizontalScale(10),
    width: "80%",
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
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
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: CustomColors.neutral_200, // Default border color
    justifyContent: "space-between",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(3),
    marginBottom: verticalScale(5),
  },
});
