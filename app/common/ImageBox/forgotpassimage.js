import { Image, StyleSheet, View, Text } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomDimensions } from '../../utils/common/CustomFont';

export default function ForgotPassImage({ uri }) {
  return (
    <View>
      <View style={styles.imagecontainer}>
        <Image
          style={styles.image}
  
          source={require("../../assets/images/Ambulance.png")}></Image>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: CustomDimensions.iwr_400,
    height: CustomDimensions.iwr_400,
    resizeMode: "cover",
    
  },
  imagecontainer: {
    overflow: 'hidden',
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    
  },

});
