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




export default function PlanBenefits({ titile, review }) {


  return (
    <>
      <View style={{ paddingHorizontal: verticalScale(20), paddingVertical:verticalScale(20), backgroundColor: CustomColors.white, marginTop: verticalScale(15), }}>
        <View style={{ flexDirection: 'row', marginBottom: verticalScale(5) }}>
          <View style={{ marginRight: horizontalScale(10), }}>
            <Menu width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Menu>
          </View>
          <Text style={styles.title}>{titile}</Text>
        </View>
        {!review.free_plan &&
          <>
            <View style={styles.other_benefits} >
            <CheckboxIcon width={CustomDimensions.icon_width_25} height={CustomDimensions.icon_height_25}></CheckboxIcon>
              <Text style={styles.otherben_txt}>{review?.key_benefits?.emergency_calls}{" x Emergency Trips"}</Text>
              <InfothemeIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></InfothemeIcon>
            </View>
            <View style={styles.other_benefits} >
            <CheckboxIcon width={CustomDimensions.icon_width_25} height={CustomDimensions.icon_height_25}></CheckboxIcon>
              <Text style={styles.otherben_txt}>{review?.key_benefits?.clinic_calls}{" x Non-Emergency Trips"}</Text>
              <InfothemeIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></InfothemeIcon>
            </View>
          </>
        }
        {review?.benefits && review?.benefits.map((item) => {
          return <View style={styles.other_benefits} key={item.id}>
             <CheckboxIcon width={CustomDimensions.icon_width_25} height={CustomDimensions.icon_height_25}></CheckboxIcon>
            <Text style={styles.otherben_txt}>{item.benefit_description}</Text>
          </View>
        })

        }

      </View>

    </>


  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.light_green,
    paddingHorizontal: CustomDimensions.pad_10,
    paddingVertical: CustomDimensions.pad_10,
    borderRadius: CustomDimensions.brad_8,
    borderWidth: CustomDimensions.bw_1,
    borderColor: CustomColors.font_clr,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },



  title: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.txt_18,
    fontFamily: CustomFonts.PoppinsMedium,
    lineHeight : verticalScale(22)
  },


  otherben_txt: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal,
    lineHeight : verticalScale(18),
    fontFamily: CustomFonts.PoppinsRegular,
    marginHorizontal: horizontalScale(10),
  },
  other_benefits:
    { flexDirection: "row", marginTop: verticalScale(10), alignItems: "center" },


});
