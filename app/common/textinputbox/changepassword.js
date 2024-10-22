import { useState } from 'react';
import { TextInput, StyleSheet, View, Text, Pressable } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function ChangePassword({ hint, onChangeText, value, onPress, eye }) {
  const [isFocused, setIsFocused] = useState(false); // Focus state

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ paddingVertical: CustomDimensions.pad_20, paddingHorizontal: CustomDimensions.pad_25 }}>
            <AntDesign
              name="lock"
              size={CustomDimensions.icon_size_30}
              color={CustomColors.actionbar_clr}></AntDesign>
          </View>
          <TextInput
            style={[
              styles.boldtextstyle,
              {
                borderColor: isFocused ? CustomColors.focusColor : CustomColors.bordercolour, borderWidth: isFocused? moderateScale(2):moderateScale(1)  // Dynamic border color
              },
            ]}
            placeholder={hint}
            value={value}
            secureTextEntry={eye}
            placeholderTextColor={CustomColors.hintcolour}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)} // Set focus to true
            onBlur={() => setIsFocused(false)} // Set focus to false when input is blurred
          ></TextInput>
        </View>
        <Pressable style={{ paddingHorizontal: CustomDimensions.pad_20 }} onPress={onPress}>
          {!eye ? (
            <Ionicons
              name="eye-off"
              size={CustomDimensions.icon_size_30}
              color={CustomColors.actionbar_clr}></Ionicons>
          ) : (
            <Ionicons
              name="eye"
              size={CustomDimensions.icon_size_30}
              color={CustomColors.actionbar_clr}></Ionicons>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.bordercolour,
    borderRadius: CustomDimensions.brad_50,
    marginTop: CustomDimensions.mar_20,
    justifyContent: "center",
  },
  boldtextstyle: {
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
    width: CustomDimensions.width_60,
    color: CustomColors.textcolour,
    borderWidth: 1, // Border width for the input
    borderRadius: CustomDimensions.brad_50, // Border radius for rounded corners
    paddingVertical: 10,
    paddingLeft: 10,
  },
});
