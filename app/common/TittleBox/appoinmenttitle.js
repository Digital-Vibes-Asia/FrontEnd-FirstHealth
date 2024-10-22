import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import FilterBox from '../PickBox/filterbox';

export default function AppoinmentTitle({ onPress, txt1, txt2 }) {
  console.log('txt1', txt1);

  return (
    <View style={styles.container}>
      <Text style={styles.boldtextstyle}>{txt1}</Text>
      <Pressable onPress={onPress} android_ripple={styles.ripple_colour}>
        <FilterBox name={txt2}></FilterBox>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 16,
    fontWeight: 'bold',
  },

  ripple_colour: {
    color: CustomColors.ripple_colour5,
  },
});
