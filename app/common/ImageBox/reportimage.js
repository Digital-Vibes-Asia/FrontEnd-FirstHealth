import {Image, StyleSheet, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';

export default function ReportImage({uri}) {
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
    width: 160,
    height: 100,
  },
  imagecontainer: {
    overflow: 'hidden',
    height: 100,
    width: 160,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
