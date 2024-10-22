import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import AlertRound from './alertround';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InfoIcon from "../../assets/icon/infoicon.svg"
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';

export default function PassAlert({ txt }) {
  return (
    <>
      <View style={[styles.container]}>

        <InfoIcon width={CustomDimensions.icon_width_30} height={CustomDimensions.icon_height_30}></InfoIcon>


        <View style={styles.gap_20}>
          <Text style={styles.desc}>{txt}</Text>

        </View>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBEB",
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: CustomColors.info_bg,
    flexDirection: "row",
    alignItems: "flex-start",
    borderStyle: "dotted",

  },



  gap_20: {
    marginLeft: horizontalScale(10),
    flex: 1,

  },

  desc: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight:verticalScale(14)
  },


});
