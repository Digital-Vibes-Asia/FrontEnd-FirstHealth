import { StyleSheet, Pressable, TextInput, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomFont';

export default function FilterBox({ onPress, value }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <TextInput
        style={styles.boldtextstyle}
        placeholder={"Purpose"}
        placeholderTextColor={CustomColors.hintcolour}
        value={value}
        editable={false}></TextInput>
        

      <FontAwesome5

        name="chevron-down"
        size={20}

        color={CustomColors.textcolour}></FontAwesome5>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: CustomColors.button_colour,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: CustomDimensions.padd_5,
    flex:1,
  },

  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
    width:"90%",
    // minWidth: "45%",
    // padding: 5,
    // minWidth:"40%",



  },
  iconstyle: {
    padding: 10,
  },
});
