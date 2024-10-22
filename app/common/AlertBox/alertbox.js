import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import AlertRound from './alertround';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/common/Metrics';
import RightArrow from "../../assets/icon/rightarrow.svg"

export default function AlertBox({ onPress }) {
  return (
    <>
      <Pressable style={[styles.container]} onPress={onPress}>
        <AlertRound></AlertRound>
        <View style={styles.gap_20}>
          <Text style={styles.title}>Are you in an emergency ? </Text>
          <View style={styles.txtgap}>
            <Text style={styles.desc}>Click to call our hotline now</Text>
            <View style={styles.rightarrow_gap}>
              <RightArrow width={CustomDimensions.icon_width_10} height={CustomDimensions.icon_height_10}></RightArrow>
            </View>
          </View>
        </View>
      </Pressable>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.white,
    padding: CustomDimensions.pad_15,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: CustomColors.bordercolour,
    flexDirection: "row",
    alignItems: "center",
  },

  // shadowProp: {
  //   shadowColor: CustomColors.black,
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },

  // elevation: {
  //   elevation: 20,
  //   shadowColor: CustomColors.black,
  // },

  gap_20: {
    marginLeft: horizontalScale(20)
  },
  title: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    margin: 0,
    padding: 0,
    lineHeight: verticalScale(19),

  },
  desc: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    margin: 0,
    padding: 0,
    lineHeight: verticalScale(18),

  },
  txtgap: { flexDirection: "row", alignItems: "center", marginTop: 0, },
  rightarrow_gap: {
    marginLeft: horizontalScale(5)
  }

});
