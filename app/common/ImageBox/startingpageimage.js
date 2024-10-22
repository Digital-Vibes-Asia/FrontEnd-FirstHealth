import { Image, StyleSheet, View, Text } from 'react-native';
import { CustomDimensions } from '../../utils/common/CustomStyles';

let imagepath = require("../../assets/images/Ambulance.png")

export default function StartingPageImage({ data }) {

  const selectedItem = data.find(item => item.selected);

  switch (selectedItem.id) {
    case 1:
      imagepath = require("../../assets/images/Ambulance.png")
      break
    case 2:
      imagepath = require("../../assets/images/Ambulance1.png")
      break
    case 3:
      imagepath = require("../../assets/images/Ambulance2.png")
      break
    case 4:
      imagepath = require("../../assets/images/Ambulance3.png")
      break
    case 5:
      imagepath = require("../../assets/images/Ambulance4.png")
      break
  }




  return (
    <View>
      <View style={styles.imagecontainer}>
        <Image
          style={styles.image}
          source={imagepath}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: CustomDimensions.screenWidth - 40,
    height: 200,
    resizeMode: "contain"

  },
  imagecontainer: {
    alignSelf: "center",


  },

});
