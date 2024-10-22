import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function ForgotTittle({ txt }) {
  return <Text style={styles.boldtextstyle}>{txt}</Text>;
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.RobotoSlabBlack,
    alignSelf: "center",
    marginBottom: CustomDimensions.mar_10,
  },
});
