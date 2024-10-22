import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';


export default function DisplayTextBox({txt1, txt2}) {
  return (
    <View style={styles.container}>
      <Text style={styles.normaltextstyle}>{txt1}</Text>
      <Text style={styles.boldtextstyle}>{txt2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
  },
  boldtextstyle: {
    width: '60%',
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabExtraBold,
    marginLeft: 10,
  },
  normaltextstyle: {
    width: '40%',

    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily:CustomFonts.RobotoSlabRegular,
    justifyContent: 'flex-start',
  },
});
