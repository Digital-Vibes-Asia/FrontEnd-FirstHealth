import { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CustomFonts, CustomFontSize, CustomDimensions } from '../../utils/common/CustomFont';

export default function ForgotMailInput({ hint, onChangeText, value }) {
  const [isFocused, setIsFocused] = useState(false); // Focus state

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingVertical: CustomDimensions.pad_20, paddingHorizontal: CustomDimensions.pad_25 }}>
          <MaterialIcons
            name="mail"
            size={CustomDimensions.icon_size_30}
            color={CustomColors.actionbar_clr}
          />
        </View>
        <TextInput
          style={[
            styles.boldtextstyle,
            {
              borderColor: isFocused ? CustomColors.focusColor : CustomColors.actionbar_clr, borderWidth: isFocused? moderateScale(2):moderateScale(1) // Dynamic border color
            },
          ]}
          placeholder={hint}
          inputMode="email"
          value={value}
          placeholderTextColor={CustomColors.hintcolour}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)} // Set focus to true
          onBlur={() => setIsFocused(false)} // Set focus to false when input is blurred
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: CustomColors.actionbar_clr,
    color: CustomColors.textcolour,
    borderWidth: CustomDimensions.bwidth_2,
    borderRadius: CustomDimensions.brad_10,
    marginTop: CustomDimensions.mar_10,
    justifyContent: "center",
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
    fontWeight: 'bold',
    width: CustomDimensions.width,
    paddingVertical: CustomDimensions.pad_10,
    paddingLeft: CustomDimensions.pad_25,
    paddingRight: CustomDimensions.pad_10,
    borderRadius: CustomDimensions.brad_10,
    borderWidth: 1,
  },
});
