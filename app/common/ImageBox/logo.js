import { Image, StyleSheet, View } from 'react-native';
import { CustomDimensions } from '../../utils/common/CustomStyles';
import { SvgUri } from 'react-native-svg';
import Sample from "../../assets/icon/icon.svg"
import Color from "../../assets/icon/colour.svg"



export default function Logo() {
  return (
    <View style={styles.container}>

      <Image
        style={styles.image}
        resizeMode="center"
        source={require("../../assets/images/logo-firsthealth.png")}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  image: {
    width: CustomDimensions.screenWidth, height: 100,
    alignSelf: "center",
  },
  container: {
    alignSelf: "center",


  }

});
