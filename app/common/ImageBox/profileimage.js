import { Image, StyleSheet, View, Text } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';

export default function ProfileImage({ uri, bmi }) {

  console.log(uri + " What is the uri...")
  return (
    <View>
      <View style={styles.imagecontainer}>
        {uri &&
          <Image
            style={styles.image}
            source={{
              uri: uri,
            }}></Image>
        }
      </View>
      <View style={styles.txtcontainer}>
        {/* <Text style={styles.boldtextstyle}>BMI-{bmi}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  imagecontainer: {
    overflow: 'hidden',
    height: 150,
    width: 150,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  txtcontainer: {
    width: 150,
    paddingTop: 5,

  },
});
