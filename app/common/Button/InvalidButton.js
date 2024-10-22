import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFonts, CustomFontSize } from '../../utils/common/CustomFont';

export default function InvalidButton({onPress, value}) {
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
    backgroundColor: CustomColors.canceled_dot,
    padding: 5,
    borderRadius: 4,
    width: 100,
  },
  button: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,    
    fontFamily:CustomFonts.RobotoSlabBold,
    alignSelf: 'center',
  },
  ripple_colour: {
    color: CustomColors.ripple_colour,
  },
});
