import { StyleSheet, View, Image } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SadEmoji from "../../assets/icon/sademoji.svg"
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';





export default function OutsideAlert({ hint, onPress }) {
  return (
    <View style={styles.container}>
      <SadEmoji width={CustomDimensions.icon_width_40} height={CustomDimensions.icon_height_40}></SadEmoji>
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
    alignItems: "center",
  },


});
