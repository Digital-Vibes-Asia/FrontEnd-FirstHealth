import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { verticalScale } from "../../utils/common/Metrics";

export default function FillButton({ onPress, value, icon, color }) {
  const IconList = ({ icon }) => {
    return (
      <>
        {" "}
        <MaterialCommunityIcons
          name={icon}
          size={CustomDimensions.icon_20}
          color={CustomColors.white}
        ></MaterialCommunityIcons>
      </>
    );
  };

  return (
    <View style={styles.whole_container}>
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: color ? color : CustomColors.new_theme_clr,
          },
        ]}
        onPress={onPress}
      >
        <Text style={styles.button}>{value}</Text>

        {icon && <IconList icon={icon} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderColor: CustomColors.theme_clr,
    padding: verticalScale(12),
    borderRadius: CustomDimensions.brad_32,
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  whole_container: {
    margin: CustomDimensions.mar_10,
  },

  button: {
    color: CustomColors.white,
    // fontSize: CustomFontSize.normal,
    // fontFamily: CustomFonts.PoppinsSemiBold,
    // marginRight: 10,
    // // alignSelf: 'center',
    // // textAlign:"center",
    // color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(19),
  },
});
