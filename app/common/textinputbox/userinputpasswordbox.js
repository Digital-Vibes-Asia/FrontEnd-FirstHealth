import { useState } from 'react';
import { TextInput, StyleSheet, View, Pressable } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomFonts, CustomFontSize, CustomDimensions } from '../../utils/common/CustomFont';

export default function UserInputPasswordBox({ hint, onChangeText, value, onPress, eye }) {
  const [isFocused, setIsFocused] = useState(false); // Focus state

  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderColor: isFocused ? '#5525A5' : CustomColors.bordercolour, borderWidth: isFocused? moderateScale(2):moderateScale(1)  // Dynamic border color
          },
        ]}
      >
        <TextInput
          style={styles.textinput}
          placeholder={hint}
          value={value}
          placeholderTextColor={CustomColors.hintcolour}
          onChangeText={onChangeText}
          secureTextEntry={eye}
          onFocus={() => setIsFocused(true)}  // Handle focus state
          onBlur={() => setIsFocused(false)}  // Handle blur state
        />
        <Pressable style={{ paddingHorizontal: CustomDimensions.pad_20 }} onPress={onPress}>
          {!eye ? (
            <Ionicons
              name="eye-off"
              size={CustomDimensions.icon_size}
              color={CustomColors.textcolour}
            />
          ) : (
            <Ionicons
              name="eye"
              size={CustomDimensions.icon_size}
              color={CustomColors.textcolour}
            />
          )}
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textinput: {
    color: CustomColors.textcolour,
    paddingLeft: CustomDimensions.pad_25,
    paddingRight: CustomDimensions.pad_20,
    paddingVertical: CustomDimensions.pad_10,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
    flex: 1,
  },
  container: {
    borderWidth: CustomDimensions.bwidth_2,
    borderRadius: CustomDimensions.brad_10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: CustomDimensions.pad_10,
  },
});
