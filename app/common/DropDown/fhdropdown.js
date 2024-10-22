import { TextInput, StyleSheet, View, Text, Pressable } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FhDropDown({ hint, onPress, value }) {
  let dd = value != "" ? value : hint

  return (
    <>
      <Pressable style={styles.container} onPress={onPress}>
        <Text
          style={[styles.textinput, { color: value != "" ? CustomColors.txt : CustomColors.bordercolour }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >{dd}</Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={CustomDimensions.icon_30}
          color={CustomColors.font_clr}
        ></MaterialCommunityIcons>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  textinput: {
    color: CustomColors.txt,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    width: "80%"

  },

  container: {
    borderWidth: 1,
    // height: 50,
    padding:10,
    // paddingLeft: CustomDimensions.pad_20,
    // paddingRight: CustomDimensions.pad_10,
    // paddingVertical: CustomDimensions.pad_10,
    marginBottom: 10,
    borderRadius: CustomDimensions.brad_8,
    borderColor: CustomColors.bordercolour,
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,

  }

});
