import { StyleSheet, Pressable, TextInput, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function CallendarBox({ value, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress} >
      <TextInput
        style={styles.boldtextstyle}
        placeholder={"Date"}
        placeholderTextColor={CustomColors.hintcolour}
        value={value == "" ? value : moment(value).format("DD-MM-YYYY")}
        editable={false}></TextInput>
      <AntDesign
        name="calendar"
        size={20}
        color={CustomColors.textcolour}></AntDesign>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    borderWidth: 1,
    paddingHorizontal: 10,
    // minWidth: "45%",
    borderColor: CustomColors.button_colour,
    borderRadius: 10,
    // height :30,
   
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
   
    paddingVertical: CustomDimensions.padd_5,
    marginRight:10,
  },

  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
    width:"90%",
   
    
    // minWidth:"40%",

  },

});
