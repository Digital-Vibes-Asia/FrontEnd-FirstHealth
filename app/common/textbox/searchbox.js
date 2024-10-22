import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomFont';

export default function SearchBox({ hint, onPress }) {
  return (
    <>
      <Pressable style={styles.container} onPress={onPress} android_ripple={styles.ripple_colour}>
        <Ionicons
          style={styles.iconstyle}
          name="search-outline"
          size={CustomDimensions.icon_size}
          color={CustomColors.textcolour}></Ionicons>

        <TextInput
          style={styles.textstyle}
          // placeholder={hint}
          value={"Search"}
          placeholderTextColor={CustomColors.hintcolour}
          editable={false}></TextInput>

      </Pressable>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.bordercolour,
    height: CustomDimensions.height_50,
    borderRadius: CustomDimensions.brad_50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textstyle: {
    color: CustomColors.hintcolour,
    paddingRight: CustomDimensions.pad_10,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
    maxWidth: CustomDimensions.width_80,
  },
  iconstyle: {
    padding: CustomDimensions.pad_10,
  },
  ripple_colour: {
    color: CustomColors.ripple_colour5,
  },
});
