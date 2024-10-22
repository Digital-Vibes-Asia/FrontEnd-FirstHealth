import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import moment from 'moment';
import QualifyPeriod from '../AlertBox/qualifyperiod';

import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';
import Menu from "../../assets/icon/menuicon.svg"
import CheckboxIcon from "../../assets/icon/checkboxicon.svg"
import InfothemeIcon from "../../assets/icon/infotheme.svg"




export default function PlanAmount({ total }) {


  return (
    <View style={{borderTopWidth: moderateScale(1), borderTopColor: CustomColors.neutralgrey_200, paddingTop: verticalScale(20), flexDirection:"row", justifyContent:"space-between", paddingHorizontal:horizontalScale(10), backgroundColor: CustomColors.white, alignItems:"center", paddingBottom: verticalScale(5)}}>
      <View style={{marginLeft: horizontalScale(10)}}>
        <Text style={styles.show}>Show price breakdown</Text>
        <Text style={styles.total}>Total <Text style={styles.inclusive}>{"(inclusive of taxes)"}</Text></Text>

      </View>
      <View style={{marginRight: horizontalScale(20)}}>
        <Text style={styles.title}>{"RM"}{total}</Text>
      </View>

      

    </View>


  );

}

const styles = StyleSheet.create({
  title: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.size_32,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight : verticalScale(38)
  },
  show: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight : verticalScale(14)
  },
  total: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.txt_18,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight : verticalScale(22)
  },
  inclusive: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.txt_10,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight : verticalScale(22)
  },
  

});
