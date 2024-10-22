import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFonts, CustomFontSize } from '../../utils/common/CustomFont';

export default function GreetingBox({txt}) {
  return <Text style={styles.boldtextstyle}>{txt}</Text>;
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabRegular,
  },
});
