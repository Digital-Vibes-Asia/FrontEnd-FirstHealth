import { TextInput, StyleSheet, View, Pressable, Text } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import moment from "moment";
import MembersCard from "./memberscard";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/common/Metrics";
import Icon from "../../assets/icon/addpersonicon.svg";

export default function MembersCovered({
  titile,
  members,
  onpress,
  data,
  membersData,
  totalCount,
}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.inside_container}>
          <View style={{ marginRight: horizontalScale(10) }}>
            <Icon
              width={CustomDimensions.icon_width_20}
              height={CustomDimensions.icon_height_20}
            ></Icon>
          </View>
          <Text style={styles.title}>{titile}</Text>
        </View>

        <MembersCard
          members={members}
          onpress={onpress}
          data={data}
          membersData={membersData}
          totalCount={totalCount}
        ></MembersCard>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: CustomColors.white,
    marginTop: 15,
  },
  title: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.txt_18,
    fontFamily: CustomFonts.PoppinsMedium,
    lineHeight: verticalScale(22),
  },
  inside_container: {
    flexDirection: "row",
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
    alignItems: "center",
  },
});
