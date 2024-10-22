import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function NoDataFound({ txt }) {
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
    fontFamily: CustomFonts.RobotoSlabBold,
    marginTop: 20,
    marginBottom: 40,

  },
  nodatafoundcontainer: {
    justifyContent: "center", alignItems: 'center', flex: 1,
    backgroundColor: '#fff',
  }
});
