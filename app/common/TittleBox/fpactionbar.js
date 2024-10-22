import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomFont';

export default function FPActionbar({ txt, onPress }) {
  return (
    <View style={{flexDirection:"row",}}>
      <Pressable  onPress={()=>{
        console.log("Madurai thandi tollgate...")
        onPress()

      }}>
        <Ionicons
          name="arrow-back"
          size={CustomDimensions.icon_size}
          color={CustomColors.actionbar_clr}></Ionicons>
      </Pressable>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.boldtextstyle}>{txt}</Text>
        </View>
      </View>
    </View>
  )


}

const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.RobotoSlabBold,
    alignSelf: "center",
    marginBottom: CustomDimensions.mar_20,
    paddingHorizontal: CustomDimensions.pad_20,


  },
});
