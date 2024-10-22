import {Pressable, StyleSheet, Text, View} from 'react-native';

import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';

export default function WelcomeBox({txt}) {
  return <Text style={styles.boldtextstyle}>{txt}</Text>;
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.txt,
    fontSize: CustomFontSize.large_title,
    fontFamily: CustomFonts.ComfortaaBold,
    alignSelf:"center",
  },
});
