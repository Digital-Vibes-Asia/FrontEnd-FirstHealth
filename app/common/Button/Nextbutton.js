import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFonts, CustomFontSize } from '../../utils/common/CustomFont';

export default function NextButton({ onPress, value }) {

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
    backgroundColor: CustomColors.actionbar_clr,
    padding: CustomDimensions.pad_20,
    borderRadius: CustomDimensions.brad_50,
  },
  button: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.RobotoSlabBold,
    alignSelf: 'center',
  },
  ripple_colour: {
    color: "#8B93AC",
  },
  whole_container: {
    margin: CustomDimensions.mar_10,

  },
});
