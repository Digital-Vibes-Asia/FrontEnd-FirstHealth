import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function SubmitButton({onPress, value}) {

  return (
    <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        android_ripple={styles.ripple_colour}
        onPress={onPress}>
        <Text style={styles.button}>{value}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.button_colour,
    padding: 10,
    borderRadius: 4,
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
  whole_container: {
    margin: 20,
  
  },
});
