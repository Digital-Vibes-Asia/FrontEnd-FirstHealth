import { StyleSheet, Text, View } from "react-native";
import PhoneIconRed from "../../assets/icon/phoneIconRedColor.svg";
import PhoneIconYellow from "../../assets/icon/phoneIconYellowColor.svg";
import SemiCircleProgress from "semi-circle-progress-bar";
import {
  CustomColors,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/common/Metrics";
import SemiCircularProgress from "../CommonSlots/semiCircular";

export default function ProgressBox({ screen, data }) {
  const totalEmerCalls =
    data?.user_subscription?.t_emergency_calls || data?.t_emergency_calls || 0;
  const totalNonEmerCalls =
    data?.user_subscription?.t_clinic_calls || data?.t_clinic_calls || 0;
  const remainEmerCalls =
    data?.user_subscription?.r_emergency_calls || data?.r_emergency_calls || 0;
  const remainNonEmerCalls =
    data?.user_subscription?.r_clinic_calls || data?.r_clinic_calls || 0;

  // Convert remaining calls for progress percentage calculations
  const remainEmerCallConvert = (remainEmerCalls / totalEmerCalls) * 100;
  const remainNonEmerCallConvert =
    (remainNonEmerCalls / totalNonEmerCalls) * 100;
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.box}>
          <PhoneIconRed style={{ marginTop: "-10%" }} />
          <View style={{ marginVertical: "5%" }}>
            <SemiCircularProgress
              percentage={remainEmerCalls === 0 ? 0 : remainEmerCallConvert} // Set this to 50 to fill 50% of the semi-circle
              radius={65} // You can adjust the radius if needed
              strokeWidth={12} // Adjust the stroke width if needed
              progressColor={CustomColors.errorRed_300} // Color of the progress bar
              backgroundColor={CustomColors.neutralgrey_200} // Background color of the semi-circle
              rotateDegrees={360}
              remainEmerCalls={remainEmerCalls}
            />
          </View>
          <View style={{ paddingBottom: moderateScale(5) }}>
            <Text style={styles.cardTilTxt}>Emergency trips remaining</Text>
            <Text style={styles.cardTxt}>out of {totalEmerCalls} trips</Text>
          </View>
        </View>
        <View style={styles.box}>
          <PhoneIconYellow style={{ marginTop: "-10%" }} />
          <View style={{ marginVertical: "5%" }}>
            <SemiCircularProgress
              percentage={
                remainNonEmerCalls === 0 ? 0 : remainNonEmerCallConvert
              } // Set this to 50 to fill 50% of the semi-circle
              radius={65} // You can adjust the radius if needed
              strokeWidth={12} // Adjust the stroke width if needed
              progressColor={CustomColors.warning_yellow_400} // Color of the progress bar
              backgroundColor={CustomColors.neutralgrey_200} // Background color of the semi-circle
              rotateDegrees={360}
              remainEmerCalls={remainNonEmerCalls}
            />
          </View>
          <View style={{}}>
            <Text style={styles.cardTilTxt}>Non-emergency trips remaining</Text>
            <Text style={styles.cardTxt}>out of {totalNonEmerCalls} trips</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "48%",
    height: "100%",
    backgroundColor: CustomColors.white,
    borderRadius: moderateScale(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Offset
    shadowOpacity: 0.1, // Opacity
    shadowRadius: 8, // Blur radius
    // Android shadow properties
    elevation: 4, // Elevation level (can be adjusted)l
    // justifyContent: "center",
    alignItems: "center",
    borderWidth: moderateScale(1),
    borderColor: CustomColors.border_color,
  },
  cardTilTxt: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontSize: CustomFontSize.normal,
    textAlign: "center",
    padding: moderateScale(15),
    paddingVertical: verticalScale(5),
    color: CustomColors.neutral_700,
    lineHeight: verticalScale(18),
  },
  cardTxt: {
    paddingBottom: verticalScale(10),
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: CustomFontSize.normal_12,
    color: CustomColors.neutral_700,
    textAlign: "center",
    lineHeight: verticalScale(14),
  },
  rangeNum: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontSize: CustomFontSize.size_32,
    color: CustomColors.light_black,
  },
});
