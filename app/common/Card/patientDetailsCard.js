import React from "react";
import { StyleSheet, View } from "react-native";
import { horizontalScale, moderateScale } from "../../utils/common/Metrics";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import { Card } from "react-native-paper";
import { Text } from "react-native";
import UserIcon from "../../assets/icon/userIcon3.svg";

export default function PatientDetailsCard() {
  return (
    <View>
      <View style={styles.cardMain}>
        <Card style={styles.card}>
          <View style={styles.content}>
            <UserIcon
              width={CustomDimensions.icon_width_50}
              height={CustomDimensions.icon_height_50}
            />
            <View style={{ paddingHorizontal: horizontalScale(15) }}>
              <Text style={styles.titleTxt}>Patient details</Text>
              <Text style={styles.subTitleTxt}>Nur Rayanah Sayed</Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
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
    marginVertical: moderateScale(15),
  },
  content: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  titleTxt: {
    color: CustomColors.focusColor,
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontSize: CustomFontSize.normal_12,
  },
  subTitleTxt: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal_12,
    color: CustomColors.neutral_700,
    flexDirection: "row",
  },
});
