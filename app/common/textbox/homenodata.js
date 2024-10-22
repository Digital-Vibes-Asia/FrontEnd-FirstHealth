import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function HomeNoData({ txt }) {
  return (
    <View style={styles.nodatafoundcontainer}>
      <Text style={styles.boldtextstyle}>{txt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabBold,
  },
  nodatafoundcontainer: { height: 100, borderRadius: 10, borderWidth: 1, borderColor: CustomColors.bordercolour, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }
});
