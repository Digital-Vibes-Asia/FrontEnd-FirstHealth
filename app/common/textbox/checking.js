import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import Octicons from 'react-native-vector-icons/Octicons';
import { Checkbox } from 'react-native-paper';
import { CustomDimensions, CustomFonts, CustomFontSize } from '../../utils/common/CustomFont';

export default function Checking({ status, txt }) {
  return (
    <View style={styles.container}>
      <Checkbox
        status={status}
        color={CustomColors.green}
        uncheckedColor={CustomColors.bordercolour}
      />
      <Text style={styles.textstyle}>{txt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textstyle: {
    color: CustomColors.hintcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular
  },
  container: {
    flexDirection: "row", alignItems: "center",
    height: CustomDimensions.height,

  }
});
