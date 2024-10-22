import { Pressable, StyleSheet, Text, View } from 'react-native';


import { CustomColors, CustomFontSize, CustomDimensions, CustomFonts } from '../../utils/common/CustomStyles';

export default function CloseButton({ onPress, value }) {
  return (
    <Pressable
      style={styles.container}
     
      onPress={onPress}>
      <Text style={styles.button}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.theme_clr,
    padding: 10,
    borderRadius: 10,
    width: 150,

  },
  button: {
    color: CustomColors.white,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    alignSelf: 'center',
  },
 
});
