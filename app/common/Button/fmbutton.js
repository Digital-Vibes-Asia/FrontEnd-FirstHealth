import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RightArrow from "../../assets/icon/rightarrow(theme).svg"
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';

export default function FmButton({ onPress, value }) {

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
    borderColor: CustomColors.theme_clr,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(32),
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  whole_container: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20)
  },

  button: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(19),
    // alignSelf: 'center',
    // textAlign:"center",
  },
});
