import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import FilterBox from '../PickBox/filterbox';
import CallendarBox from '../PickBox/callendarbox';


export default function AppoinmentFilter({ onPress1, value1, value2, onPress2 }) {


  return (
    <View style={styles.container}>

      <CallendarBox value={value1} onPress={onPress1} android_ripple={styles.ripple_colour}  ></CallendarBox>


      <FilterBox value={value2} onPress={onPress2} android_ripple={styles.ripple_colour}></FilterBox>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // height:50,
  
    

  },


  ripple_colour: {
    color: CustomColors.ripple_colour5,
  },
});
