import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';

export default function SigninButton({ onPress, value }) {

  return (
    <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        android_ripple={styles.ripple_colour}
        onPress={onPress}>
        <Text style={styles.button}>{value}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: CustomColors.theme_clr,
    borderWidth:moderateScale(1),
    borderColor: CustomColors.white,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(32),
  },

  whole_container: {
    margin: verticalScale(10),

  },

  button: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    alignSelf: 'center',
    lineHeight: verticalScale(19),
  },
});
