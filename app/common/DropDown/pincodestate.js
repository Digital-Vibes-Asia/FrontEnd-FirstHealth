import { TextInput, StyleSheet, View, Text, Pressable } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PincodeState({ hint1, hint2, hint3, value1, value2, value3, onChangeText1, onChangeText2, onPress }) {

  let dd = value3 != "" ? value3 : hint3
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, }}>
        <TextInput
          style={styles.inputtextinput}
          placeholder={hint1}
          value={value1}
          inputMode={"decimal"}
          placeholderTextColor={CustomColors.bordercolour}
          onChangeText={onChangeText1}></TextInput>
        <TextInput
          style={styles.inputtextinput}
          placeholder={hint2}
          value={value2}
          inputMode={"text"}
          placeholderTextColor={CustomColors.bordercolour}
          onChangeText={onChangeText2}></TextInput>

        <Pressable style={styles.container} onPress={onPress}>
          <Text
            style={[styles.textinput, { color: value3 != "" ? CustomColors.txt : CustomColors.bordercolour }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{dd}</Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={CustomDimensions.icon_30}
            color={CustomColors.font_clr}
          ></MaterialCommunityIcons>

        </Pressable>

      </View>


    </>
  );
}

const styles = StyleSheet.create({
  textinput: {
    color: CustomColors.txt,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    width: "60%"
  },

  container: {
    borderWidth: 1,
    height: 50,
    width: "30%",
    borderRadius: CustomDimensions.brad_8,
    borderColor: CustomColors.bordercolour,
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    overflow: "hidden",
  },
  inputtextinput: {
    borderColor: CustomColors.bordercolour,
    color: CustomColors.txt,
    borderWidth: 1,
    paddingLeft: CustomDimensions.pad_20,
    paddingRight: CustomDimensions.pad_10,
    borderRadius: CustomDimensions.brad_8,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    height: 50,
    width: "30%",
    // paddingVertical: CustomDimensions.pad_10,

  },

});
