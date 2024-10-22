import {StyleSheet, Pressable, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';

export default function DateSlotBox({
  onChangeText,
  bgclr,
  slots,
  brclr,
  txtclr,
}) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          borderColor: brclr,
          backgroundColor: bgclr,
        },
      ]}
      onPress={onChangeText}>
      <Text style={[styles.boldtextstyle, {color: txtclr}]}>{slots}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    width: 70,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 14,
    padding: 5,
    fontWeight: 'bold',
  },
});
