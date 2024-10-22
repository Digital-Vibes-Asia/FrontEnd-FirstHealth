import {Image, StyleSheet, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';

export default function AppoinmrntImage({uri}) {
  return (
    <View style={styles.imagecontainer}>
      <Image
        style={styles.image}
        source={{
          uri: uri,
        }}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    resizeMode: 'stretch',
  },
  imagecontainer: {
    width: 65,
    height: 65,
    overflow: 'hidden',
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
