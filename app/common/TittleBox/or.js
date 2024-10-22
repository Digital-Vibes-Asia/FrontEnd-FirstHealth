import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomFonts, CustomDimensions, CustomFontSize } from '../../utils/common/CustomFont';

export default function Or({txt}) {
  return (
  <View style={{justifyContent:"center", alignItems:"center", marginTop:CustomDimensions.mar_10,}}>
  <Text style={styles.boldtextstyle} >{txt}</Text>

  </View>
  )
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontFamily:CustomFonts.RobotoSlabBold,
    alignSelf:"center",
    fontSize: CustomFontSize.normal,
    justifyContent:"center",
    
  },
});
