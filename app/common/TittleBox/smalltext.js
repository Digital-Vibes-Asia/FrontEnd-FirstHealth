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




export default function SmallText({ txt }) {

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{txt}</Text>
    </View>

  );

}

const styles = StyleSheet.create({

  txt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
    textAlign:"center",
  },
  container: { alignItems: "center",  }



});
