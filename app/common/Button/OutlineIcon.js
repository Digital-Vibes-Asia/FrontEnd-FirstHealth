import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';
import Download from "../../assets/icon/download.svg"

export default function OutlineIcon({ onPress, value, icon }) {

  const IconList = ({ icon }) => {
    switch (icon) {
      case "download":
        return <Download width={CustomDimensions.icon_height_20} height={CustomDimensions.icon_height_20} ></Download>
      default:
        break;
    }
    return (
      <></>
    )
  }

  return (
    // <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        android_ripple={styles.ripple_colour}
        onPress={onPress}>

        <Text style={styles.button}>{value}</Text>
        {
          icon ?
            <>
              <View style={{ marginLeft: horizontalScale(10) }}>
                <IconList icon={icon} />
              </View>
            </> :
            <></>
        }
      </Pressable>

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: CustomColors.theme_clr,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(32),
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },

  whole_container: {
    marginVertical: verticalScale(10),
    marginHorizontal: moderateScale(10)
  },

  button: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(19),
  },
});
