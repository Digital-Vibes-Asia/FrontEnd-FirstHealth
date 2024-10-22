import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import AlertRound from './alertround';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Info from "../../assets/icon/orangeinfo.svg"
import { horizontalScale,verticalScale,moderateScale } from '../../utils/common/Metrics';
import Infotheme from "../../assets/icon/infotheme.svg"


export default function QualifyPeriod({ txt, txt2,txt3,txt4 }) {
  return (
    <>
      <View style={[styles.container]}>
        <View >
          <Info width={CustomDimensions.icon_width_30} height={CustomDimensions.icon_height_30}></Info>
        </View>

        <View style={styles.gap_20}>
          <Text style={styles.desc}>{txt} <Text style={styles.bold}>{txt2}</Text> <Text style={styles.desc}>{txt3}</Text> </Text>
          <View style={{flexDirection:"row", alignItems:"flex-end", }}>
          <Text style={styles.link}>{txt4}</Text> 
          <Infotheme width={CustomDimensions.icon_width_15} height={CustomDimensions.icon_height_15}></Infotheme>
          
          </View>
        </View>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.info_bg2,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: CustomColors.info_bg,
    flexDirection: "row",
    alignItems: "flex-start",
    borderStyle: "dotted",

  },



  gap_20: {
    marginLeft: CustomDimensions.mar_20,
    flex: 1,

  },

  desc: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight:verticalScale(14)
  },
  bold: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight:verticalScale(14)
  },
  link: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight:verticalScale(14),
    textDecorationLine:'underline',
    marginTop:verticalScale(10),
    marginRight:horizontalScale(5)
  },


});
