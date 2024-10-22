import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SignoutButton({onPress, value}) {
  return (
    <Pressable
      style={styles.container}
      android_ripple={styles.ripple_colour}
      onPress={onPress}>
      <FontAwesome
      style={styles.icon}
        name="sign-out"
        size={20}
        color={CustomColors.white}></FontAwesome>
      <Text style={styles.button}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.red,
    justifyContent:"flex-start",
    flexDirection:"row",
    padding: 10,
    borderRadius: 10,
    width: 200,
  },
  button: {
    color: CustomColors.white,
    fontSize: 16,
    paddingLeft:10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  icon:{
    paddingLeft:10,
  },
  ripple_colour: {
    color: CustomColors.ripple_colour3,
  },
});
