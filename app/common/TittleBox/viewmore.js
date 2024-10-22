import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomFonts, CustomFontSize, CustomDimensions } from '../../utils/common/CustomFont';

export default function ViewMore({onPress, txt1, txt2}) {
  return (
    <View style={styles.container}>
      <Text style={styles.boldtextstyle}>{txt1}</Text>
      <Pressable onPress={onPress} android_ripple={styles.ripple_colour}>
        <Text style={styles.normaltextstyle}>{txt2}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.title,    
    fontFamily:CustomFonts.RobotoSlabBold,
  },
  normaltextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    textDecorationLine: 'underline',
    textDecorationColor: CustomColors.textcolour,
    textDecorationStyle: 'solid',
  },
  ripple_colour: {
    color: CustomColors.ripple_colour5,
  },
});
