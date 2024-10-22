import { StyleSheet, View, Image, Text } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, } from '../../utils/common/Metrics';


export default function SuccessText({ hint, onPress, txt }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.txtstyle}>{txt}</Text>
    </View>

  );
}

const styles = StyleSheet.create({

  txtstyle: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.txt_18,
    fontFamily: CustomFonts.PoppinsRegular,
    marginTop: verticalScale(10),
    lineHeight: verticalScale(22)
  },



});
