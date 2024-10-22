import { Pressable, StyleSheet, Text, View } from "react-native";
// import RightArrow from "../../assets/icon/rightarrow.svg";
import Logout from "../../assets/icon/logout.svg";
import Trash from "../../assets/icon/trash.svg";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import RightArrow from "../../assets/icon/rightarrow(theme).svg"


function IconComp({ icon }) {
  switch (icon) {
    case "right_arrow":
      return (
        <>
          <RightArrow
            width={CustomDimensions.icon_width_25}
            height={CustomDimensions.icon_height_20}
            color={CustomColors.new_theme_clr}
          ></RightArrow>
        </>
      );
    case "logout":
      return (
        <>
          <Logout
            width={CustomDimensions.icon_width_20}
            height={CustomDimensions.icon_height_20}
            color={CustomColors.new_theme_clr}
            ></Logout>
        </>
      );
    case "trash":
      return (
        <>
          <Trash
            width={CustomDimensions.icon_width_20}
            height={CustomDimensions.icon_height_20}
            color={CustomColors.new_theme_clr}
            ></Trash>
        </>
      );
    default:
      break;
  }
}

export const ActionList = ({ title, icon, onPress }) => {
  return (
    <>
      <Pressable onPress={onPress}>
        <View style={styles.listContainer}>
          <Text style={styles.listText}>{title}</Text>
          <IconComp icon={icon} />
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  listText: {
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: 19,
    color: CustomColors.neutral_600,
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: CustomColors.neutralgrey_200,
    borderBottomWidth: 0.5,
    width: CustomDimensions.screenWidth,
    paddingRight: CustomDimensions.pad_30,
    paddingVertical: CustomDimensions.pad_20,
  },
});
