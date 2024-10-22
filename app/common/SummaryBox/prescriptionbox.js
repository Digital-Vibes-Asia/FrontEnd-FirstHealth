import {StyleSheet, Pressable, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function PrescriptionBox({onChangeText, date}) {
  return (
    <Pressable style={styles.container} onPress={onChangeText}>
      <FontAwesome
        style={styles.iconstyle}
        name="arrow-circle-down"
        size={30}
        color={CustomColors.button_colour}></FontAwesome>
      <Text style={styles.boldtextstyle}>{date}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.white,
    borderColor: CustomColors.bordercolour,
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtcontainer: {
    marginTop: 10,
  },

  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
