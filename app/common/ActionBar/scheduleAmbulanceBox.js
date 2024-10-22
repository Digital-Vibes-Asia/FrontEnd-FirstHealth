import { TextInput, StyleSheet, View, Pressable, Text } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/common/Metrics";
import BackButton from "../../assets/icon/backbutton.svg";
import ActivityIcon from "../../assets/icon/menu(light).svg";
import LinearGradient from "react-native-linear-gradient";

export default function ScheduleAmbulanceBox({ onPress }) {
  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 2 }}
        colors={[CustomColors.new_theme_clr, CustomColors.theme_clr]}
        style={[styles.container]}
      >
        <Pressable style={{ marginHorizontal: 20 }} onPress={onPress}>
          <BackButton
            width={CustomDimensions.icon_width_50}
            height={CustomDimensions.icon_height_50}
          ></BackButton>
        </Pressable>
        <View>
          <Text style={styles.ttiletxt}>Scheduled ambulance</Text>
          <Text style={styles.subTitle}>
            You can track and contact your driver once they have been dispatched
          </Text>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.new_theme_clr,
    paddingVertical: verticalScale(16),
    // height: 100,
    borderWidth: moderateScale(1),
    // borderColor: CustomColors.bordercolour,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  // shadowProp: {
  //   shadowColor: CustomColors.black,
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 3,
  // },

  // elevation: {
  //   elevation: 20,
  //   shadowColor: CustomColors.black,
  // },

  ttiletxt: {
    color: CustomColors.white,
    fontSize: CustomFontSize.txt_18,
    fontFamily: CustomFonts.PoppinsMedium,
    fontWeight: "600",
  },
  subTitle: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal_12,
    color: CustomColors.white,
    maxWidth: "85%",
  },
});
