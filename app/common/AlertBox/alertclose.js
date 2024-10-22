import { StyleSheet, View, Image } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';
import Close from "../../assets/icon/close.svg"


export default function AlertClose() {
  return (
    <View style={styles.container}>
      <Close width={CustomDimensions.icon_width_25} height={CustomDimensions.icon_height_25}></Close>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: CustomColors.smiley_bg,
    width: horizontalScale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(60),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",

  },


});
