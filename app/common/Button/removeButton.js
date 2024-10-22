import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  CustomColors,
  CustomFontSize,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from "../../utils/common/Metrics";
import Xicon from "../../assets/icon/xIcon.svg";
import DeleteIcon from "../../assets/icon/deleteIcon.svg";

export default function RemoveButton({ onPress, value, screen, status }) {
  return (
    <View
      style={[
        styles.whole_container,
        {
          paddingHorizontal:
            screen === "dui" ? moderateScale(0) : horizontalScale(15),
        },
      ]}
    >
      <Pressable
        style={styles.container}
        android_ripple={styles.ripple_colour}
        onPress={onPress}
      >
        {status === 0 || status === 1 ? null : <Xicon />}

        <Text style={styles.button}>{value}</Text>
        {status === 0 || status === 1 ? <DeleteIcon /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.error_red,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(32),
    marginVertical: verticalScale(15),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width:'100%'
  },

  whole_container: {
    width: "100%",
    paddingHorizontal: horizontalScale(20),
    
  },
  button: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    alignSelf: "center",
    fontWeight: "600",
    paddingHorizontal: horizontalScale(5),
    paddingTop: verticalScale(5),
  },
});
