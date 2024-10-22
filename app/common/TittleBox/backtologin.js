import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomFonts,CustomFontSize, CustomDimensions } from '../../utils/common/CustomFont';

export default function BacktoLogin({txt, onPress}) {
  return (
  <View style={{justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
  <Text style={styles.boldtextstyle} >{"Back to"}</Text>
  <Pressable onPress={onPress}>
  <Text style={styles.textstyle} >{"Sign in"}</Text>
  </Pressable>
  </View>
  )
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabSemiBold,
    alignSelf:"center",
    justifyContent:"center",
    marginRight:CustomDimensions.mar_5,
  },
  textstyle: {
    color: CustomColors.button_colour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabSemiBold,
    alignSelf:"center",
    justifyContent:"center",
    textDecorationLine:"underline"
  },
});
