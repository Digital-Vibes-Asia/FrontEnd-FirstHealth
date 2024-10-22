import {StyleSheet, Pressable, Image} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function Avatar({onPress, uri}) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      android_ripple={styles.ripple_colour}>
      <Image
        style={styles.image}
        source={{
          uri: uri,
        }}></Image>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: CustomDimensions.iwr_50,
    width: CustomDimensions.iwr_50,
    borderRadius: CustomDimensions.brad_50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: CustomDimensions.iwr_50,
    height: CustomDimensions.iwr_50,
  },
  ripple_colour: {
    color: CustomColors.ripple_colour5,
  },
});
