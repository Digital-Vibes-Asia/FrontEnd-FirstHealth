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




export default function ThemeSuccessText({ txt, onPress }) {

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.txt}>{txt}</Text>
    </Pressable>

  );

}

const styles = StyleSheet.create({

  txt: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(22),
    textAlign: "center"
  },
  container: {
     alignItems: "center", 
  }



});
