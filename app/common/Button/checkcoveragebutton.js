import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';
import SearchIcon from "../../assets/icon/search.svg"
import GreySearchIcon from "../../assets/icon/greysearch"

export default function CheckCoverageButton({ onPress, value, location }) {

  let condition = location.length > 0 ? true : false


  return (
    <View style={styles.whole_container}>
      <Pressable
        style={[styles.container, { borderWidth: condition ? 1 : 0, backgroundColor: condition ? CustomColors.white : CustomColors.neutral_100, }]}
        android_ripple={styles.ripple_colour}
        onPress={onPress}>
        <Text style={[styles.button, { color: condition ? CustomColors.new_theme_clr : CustomColors.neutral_200, }]}>{value}</Text>
        {condition == "" ?
          <View style={{ marginLeft: verticalScale(5) }}>
            <GreySearchIcon width={CustomDimensions.icon_height_30} height={CustomDimensions.icon_height_30}></GreySearchIcon>
          </View>
          :
          <View style={{ marginLeft: verticalScale(5) }}>
            <SearchIcon width={CustomDimensions.icon_height_30} height={CustomDimensions.icon_height_30}></SearchIcon>
          </View>
        }
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

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },

  whole_container: {
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),

  },

  button: {

    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(19),
    // alignSelf: 'center',
    // textAlign:"center",
  },
});
