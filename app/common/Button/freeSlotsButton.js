import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  CustomColors,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import UserPlusIconLarge from "../../assets/icon/userRoundPlusIcon.svg";
import { horizontalScale, moderateScale } from "../../utils/common/Metrics";
import RightArrow from "../../assets/icon/rightarrow(theme).svg";
import { useNavigation } from "@react-navigation/native";

export default function FreeSlotsButton({ data, fetching }) {
  const navigation = useNavigation();
  const remain_slot = data?.user_subscription?.remain_slot;
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate("addscreen", { fetching });
      }}
    >
      <View style={styles.container2}>
        <UserPlusIconLarge />
        <View>
          <Text style={styles.conTxt1}>{remain_slot} dependant slots free</Text>
          <Text style={styles.conTxt2}>Click to invite or enter details</Text>
        </View>
      </View>
      <View>
        <RightArrow />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    backgroundColor: CustomColors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Offset
    shadowOpacity: 0.1, // Opacity
    shadowRadius: 8, // Blur radius
    // Android shadow properties
    elevation: 4, // Elevation level (can be adjusted)l
    borderColor: CustomColors.border_color,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(20),
  },
  iconContainer: {
    backgroundColor: CustomColors.lighttheme,
    padding: moderateScale(10),
    borderRadius: 100
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
  },
  conTxt1: {
    paddingHorizontal: horizontalScale(10),
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
  },
  conTxt2: {
    paddingHorizontal: horizontalScale(10),
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal_12,
    color: CustomColors.neutral_600,
  },
});
