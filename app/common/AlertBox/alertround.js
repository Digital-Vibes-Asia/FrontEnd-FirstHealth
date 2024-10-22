import { StyleSheet, View, Image } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import AlertIcon from "../../assets/icon/alerticon.svg"
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';


export default function AlertRound() {
  return (
    <View style={styles.container}>
      <AlertIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></AlertIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.alert_round,
    width: horizontalScale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(40),
    justifyContent: "center",
    alignItems: "center"
  },
  icon_style: { alignSelf: "center", justifyContent: "center" }

});
