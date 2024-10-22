import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';


export default function DropDownBox({ hint, onPress, value, title, editable }) {
  return (
    <View>
      <Text style={styles.titlestyle}>{title}</Text>
      <Pressable style={styles.textinput} onPress={() => {
        if (editable) {
          onPress()
        }
      }
      }>
        <TextInput
          style={styles.textstyle}
          placeholder={hint}
          placeholderTextColor={CustomColors.hintcolour}
          value={value}
          editable={false}></TextInput>
        <FontAwesome5
          style={styles.iconstyle}
          name="chevron-down"
          size={CustomDimensions.icon_size}
          color={CustomColors.textcolour}></FontAwesome5>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderColor: CustomColors.bordercolour,
    // height: 43,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textstyle: {
    color: CustomColors.textcolour,
    paddingLeft: 25,
    paddingRight: 10,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    maxWidth: '90%',
  },
  iconstyle: {
    padding: 10,
  },
  titlestyle: {
    color: CustomColors.textcolour,
    marginBottom: 10,
    fontSize: CustomFontSize.title,    
    fontFamily:CustomFonts.RobotoSlabBold,
  },
});
