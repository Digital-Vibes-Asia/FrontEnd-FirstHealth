import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function AskButton({onPress, value}) {
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
    borderColor: CustomColors.bordercolour,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  button: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.title,    
    fontFamily:CustomFonts.RobotoSlabBold,
    alignSelf: 'center',
  },
  ripple_colour: {
    color: CustomColors.ripple_colour2,
  },
});
