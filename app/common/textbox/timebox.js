import {TextInput, StyleSheet, View, Pressable, Text} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import Octicons from 'react-native-vector-icons/Octicons';

export default function TimeBox({hint, onPress, value, title}) {
  return (
    <View>
      <Text style={styles.titlestyle}>{title}</Text>
      <Pressable style={styles.textinput} onPress={onPress}>
        <TextInput
          style={styles.textstyle}
          placeholder={hint}
          placeholderTextColor={CustomColors.hintcolour}
          // value={value}
          editable={false}></TextInput>
        <Octicons
          style={styles.iconstyle}
          name="clock"
          size={20}
          color={CustomColors.textcolour}></Octicons>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderColor: CustomColors.bordercolour,
    height: 43,
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
    fontSize: 14,
    maxWidth: '90%',
  },
  iconstyle: {
    padding: 10,
  },
  titlestyle: {
    color: CustomColors.textcolour,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
