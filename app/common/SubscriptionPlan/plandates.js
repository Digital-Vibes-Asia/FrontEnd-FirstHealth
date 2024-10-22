import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import moment from 'moment';
import QualifyPeriod from '../AlertBox/qualifyperiod';
import { horizontalScale, verticalScale } from '../../utils/common/Metrics';
import PersonIcon from "../../assets/icon/personicon.svg"



export default function PlanDates({ titile }) {
  let cd = new Date()
  let fd = new Date()
  fd.setFullYear(fd.getFullYear() + 1);

  return (
    <>
      <View style={{ paddingHorizontal: horizontalScale(20), paddingVertical:verticalScale(20), backgroundColor: CustomColors.white, marginTop: verticalScale(15),  }}>
        <View style={{ flexDirection: 'row',  }}>
          <View style={{ marginRight: horizontalScale(10), }}>
              <PersonIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></PersonIcon>
          </View>
          <Text style={styles.title}>{titile}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: verticalScale(20)}}>
          <Text style={styles.sand_end}>{"Coverage Start Date"}</Text>
          <Text style={styles.date}>{moment(cd).format("DD MMMM YYYY")}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: verticalScale(20) }}>
          <Text style={styles.sand_end}>{"Coverage End Date"}</Text>
          <Text style={styles.date}>{moment(fd).format("DD MMMM YYYY")}</Text>
        </View>
        <QualifyPeriod txt='Your subscription will have a ' txt2={"14-day Qualifying Period "} txt3={"before it takes into effect"} txt4={"What is the Qualifying Period?"}></QualifyPeriod>
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
  sand_end: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight : verticalScale(18)
  },
  date: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight : verticalScale(18)
  },


});
