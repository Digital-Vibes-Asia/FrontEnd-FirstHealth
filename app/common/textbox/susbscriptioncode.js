import { TextInput, StyleSheet, View, Text } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';

export default function SubscriptionCode({ desc }) {
  return (
    <>
      <Text style={styles.desctxt}>{desc}</Text>

    </>
  );
}

const styles = StyleSheet.create({

  desctxt: {
    color: CustomColors.oben_txt,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    marginVertical: 10,
  

  },
});
