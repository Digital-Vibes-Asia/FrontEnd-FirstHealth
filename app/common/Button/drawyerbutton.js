import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DrawyerButton({onPress, value, icon}) {
  return (
    <Pressable
      style={styles.container}
      android_ripple={styles.ripple_colour}
      onPress={onPress}>
      <MaterialCommunityIcons
        style={styles.icon}
        name={icon}
        size={20}
        color={CustomColors.white}></MaterialCommunityIcons>
      <Text style={styles.button}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.dr_bgbutton,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    width: 200,
  },
  button: {
    color: CustomColors.white,
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  icon: {
    paddingLeft: 10,
  },
  ripple_colour: {
    color: CustomColors.ripple_colour4,
  },
});
