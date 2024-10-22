import {StyleSheet, Pressable, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomFont';

export default function ForgotpassBox({
  onPress,
  txt
 
}) {
  return (
    <Pressable
      style={[
        styles.container
      ]}
      onPress={onPress}>
      <Text style={styles.boldtextstyle}>{txt}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    marginTop:CustomDimensions.mar_10,
  },

  boldtextstyle: {
    color: CustomColors.actionbar_clr,
    fontSize: CustomFontSize.normal,
    fontFamily:CustomFonts.RobotoSlabBold,
  },
});
