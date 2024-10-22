import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { horizontalScale, moderateScale } from "../../utils/common/Metrics";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import { Card } from "react-native-paper";
import AmbulanceIcon from "../../assets/icon/ambulanceIcon.svg";
import { Text } from "react-native";
import RightArrow from "../../assets/icon/rightArrow3.svg";

export default function ScheduledCard({onPress}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.cardMain}>
        <Card style={styles.card}>
          <View style={styles.content}>
            <AmbulanceIcon
              width={CustomDimensions.icon_width_50}
              height={CustomDimensions.icon_height_50}
            />
            <View style={{ paddingHorizontal: horizontalScale(15) }}>
              <Text style={styles.titleTxt}>Ambulance is scheduled</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.subTitleTxt}>10:30AM, 27 January 2024</Text>
                <RightArrow style={{ top: -2 }} />
              </View>
            </View>
          </View>
        </Card>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#fff",
    height: moderateScale(69),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: CustomColors.bordercolour,
  },
  cardMain: {
    width: "100%",
    alignItems: "center",
    // marginVertical: moderateScale(15),
  },
  content: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  titleTxt: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontSize: CustomFontSize.title,
    color: CustomColors.neutral_700,
  },
  subTitleTxt: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_500,
    flexDirection: "row",
  },
});
