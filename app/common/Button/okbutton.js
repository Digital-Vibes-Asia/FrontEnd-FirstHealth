import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomFonts, CustomFontSize, CustomDimensions } from '../../utils/common/CustomFont';

export default function OkButton({ onPress, value }) {
  return (
    <Pressable
      style={styles.container}
      android_ripple={styles.ripple_colour}
      onPress={onPress}>
      <Text style={styles.button}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.button_colour,
    padding: CustomDimensions.pad_5,
    borderRadius: CustomDimensions.brad_5,
    width: CustomDimensions.width_100,
  },
  button: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.RobotoSlabBold,
    alignSelf: 'center',
  },
  ripple_colour: {
    color: CustomColors.ripple_colour,
  },
});
