import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomColors from "../../utils/common/CustomColors"
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function DrawyerSignoutButton({uri, txt, onPress}) {

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center', maxWidth:"70%"}}>
        <View style={{marginLeft: 10, marginRight: 10}}>
          <Image
            style={{width: 20, height: 20, tintColor: '#fff'}}
            source={{
              uri: uri,
            }}
          />
        </View>
        <Text style={styles.titleText}>{txt}</Text>
      </View>
      {/* <View style={styles.iconContainer}>
        <FontAwesome
          name="long-arrow-right"
          size={22}
          backgroundColor="#E4132C"
          color="#fff"></FontAwesome>
      </View> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#E4132C",
    borderRadius: 30,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  titleText: {
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabBold,
    color: '#fff',
  },
  iconContainer: {marginLeft: 20},
});
