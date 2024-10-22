import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';
import Alert from "../../assets/icon/alerttheme.svg"
import CallIcon from "../../assets/icon/callwhite.svg"
import Close from "../../assets/icon/closetheme.svg"

export default function AreYouSureButton({ onPress, onPress2 }) {

  return (
    <View style={styles.whole_container}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
        <Alert width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Alert>
        <Text style={styles.txt}>Are you sure you want to call an ambulance?</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: verticalScale(10) }}>
        <Pressable
          style={styles.container}
          onPress={onPress}>
          <View style={{ marginRight: verticalScale(10) }}>
            <Close width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Close>
          </View>
          <Text style={styles.canceltxt}>{"Cancel"}</Text>

        </Pressable>
        <Pressable
          style={styles.container2}
          onPress={onPress2}>
          <View style={{ marginRight: verticalScale(10) }}>
            <CallIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></CallIcon>
          </View>
          <Text style={styles.buttontxt}>{"Call Now"}</Text>

        </Pressable>

      </View>



    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth:moderateScale(1),
    borderColor: CustomColors.new_theme_clr,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(32),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width:"47%"
  },
  container2: {
    backgroundColor: CustomColors.error_red,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(32),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width:"47%"
  },

  whole_container: {
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(20),
    // alignSelf: "center",
  },
  txt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(14),
    marginLeft: horizontalScale(10),
  },
  buttontxt: {
    color: CustomColors.white,
    fontSize: CustomFontSize.txt_16,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(19),
    
  },
  canceltxt: {
    color: CustomColors.theme_clr,
    fontSize: CustomFontSize.txt_16,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(19),
    
  },
});
