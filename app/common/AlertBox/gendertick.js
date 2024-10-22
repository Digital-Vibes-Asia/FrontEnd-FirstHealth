import { StyleSheet, View, Image } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import AlertIcon from "../../assets/icon/alerticon.svg"
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';
import CheckIcon from "../../assets/icon/check"


export default function GenderTick({status}) {
  return (
    <View style={styles.container}>
      {status &&
        <CheckIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></CheckIcon>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.white,
    borderWidth:moderateScale(1),
    borderColor:CustomColors.neutral_200,
    width: horizontalScale(30),
    height: verticalScale(30),
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center"
  },
  icon_style: { alignSelf: "center", justifyContent: "center" }

});
