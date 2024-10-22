import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function CalendarBox({ hint, onPress, value, title }) {
  return (
    <View>
      <Text style={styles.titlestyle}>{title}</Text>
      <Pressable style={styles.container} onPress={onPress}>
        <TextInput
          style={styles.textstyle}
          placeholder={hint}
          placeholderTextColor={CustomColors.hintcolour}
          value={value}
          editable={false}></TextInput>
        <MaterialIcons
          style={styles.iconstyle}
          name="calendar-month"
          size={20}
          color={CustomColors.textcolour}></MaterialIcons>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontFamily: CustomFonts.RobotoSlabRegular,
    maxWidth: '90%',

  },
  iconstyle: {
    padding: 10,
  },
  titlestyle: {
    color: CustomColors.textcolour,
    marginBottom: 10,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.RobotoSlabBold,
  },
});
