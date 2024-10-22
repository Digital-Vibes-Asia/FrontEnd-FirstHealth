import { Image, StyleSheet, View, Text } from 'react-native';
import { CustomDimensions, CustomColors } from '../../utils/common/CustomStyles';

export default function UncoverMap() {
  return (
    <View style={{ backgroundColor: CustomColors.theme_clr }}>

      <Image
        style={styles.image}


        source={require("../../assets/images/map.png")}></Image>


    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: CustomDimensions.screenWidth,
    height: CustomDimensions.screenHeight / 2.8,
    resizeMode: "cover",
    opacity: 0.4,
    backfaceVisibility: "hidden"



  },


});
