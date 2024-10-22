import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function DoctorSummarytxt({ txt1, txt2, txt3,txt4 }) {
  return (
    <View style={styles.whole_container}>
      <View style={styles.container}>
        <Text style={styles.normaltextstyle}>{txt1}</Text>
        <Text style={styles.boldtextstyle}>{txt2}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.normaltextstyle}>{txt3}</Text>
        <Text style={styles.boldtextstyle}>{txt4}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '30%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    // marginBottom: 5,
  },
  boldtextstyle: {
    // width: '60%',
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabBold,
    // marginLeft: 10,
  },
  normaltextstyle: {
    // width: '30%',
    minWidth:50,
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    justifyContent: 'flex-start',
  },
  whole_container:{ justifyContent: "space-between", flexDirection: "row", 
    marginBottom:5, marginLeft:10, marginRight:10,


   }
});
