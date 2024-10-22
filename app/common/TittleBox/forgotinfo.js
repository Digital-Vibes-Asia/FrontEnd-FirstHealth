import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomFonts, CustomDimensions, CustomFontSize } from '../../utils/common/CustomFont';

export default function ForgotInfo({txt}) {
  return (
  <View style={{justifyContent:"center", alignItems:"center"}}>
  <Text style={styles.boldtextstyle} >{"Where would you like to receive a "}</Text>
  <Text style={styles.boldtextstyle} >{"Verification Code ?"}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily:CustomFonts.RobotoSlabMedium, 
    alignSelf:"center",
    justifyContent:"center",
    
  },
});
