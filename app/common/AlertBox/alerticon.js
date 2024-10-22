import { StyleSheet, View, Image } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';
import CheckIcon from "../../assets/icon/check.svg"


export default function AlertIcon() {
  return (
    <View style={styles.container}>
      <CheckIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></CheckIcon>
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
    alignItems:"center",
   
  },


});
