import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomFonts, CustomDimensions, CustomFontSize } from '../../utils/common/CustomFont';

export default function SForgotTittle({txt}) {
  return <Text style={styles.boldtextstyle}>{txt}</Text>;
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.title,    
    fontFamily:CustomFonts.RobotoSlabBold,
    alignSelf:"center",
    

   
  },
});
