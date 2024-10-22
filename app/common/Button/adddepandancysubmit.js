import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RightArrow from "../../assets/icon/rightarrow2.svg"
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';

export default function AddDependancySubmit({ onPress, value, eligible }) {

  return (

    <View style={[styles.whole_container]}>
      <Pressable
        style={[styles.container, { backgroundColor: eligible ? CustomColors.new_theme_clr : CustomColors.neutral_100, borderWidth: eligible ? 1 : 0, }]}
        android_ripple={styles.ripple_colour}
        onPress={onPress}>
        <Text style={[styles.button, { color: eligible ? CustomColors.white : CustomColors.neutral_400, }]}>{value}</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: CustomColors.new_theme_clr,
    // borderColor: CustomColors.theme_clr,
    paddingHorizontal: horizontalScale(10),
    // paddingVertical: verticalScale(10),
    height: verticalScale(50),
    borderRadius: moderateScale(32),

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },

  whole_container: {
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(20),
  },

  button: {

    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(19),

    // alignSelf: 'center',
    // textAlign:"center",
  },
});
