import { Skeleton } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import LinearGradient from "react-native-linear-gradient";
import { horizontalScale, verticalScale } from "../../utils/common/Metrics";

const HeadSkeleton = () => {
  return (
    <>
      <Skeleton
        style={[styles.HeadText, { opacity: 0.4 }]}
        LinearGradientComponent={LinearGradient}
        animation="wave"
        circle
        width={CustomDimensions.icon_width_20}
        height={CustomDimensions.icon_height_20}
      />
      <Skeleton
        style={[styles.HeadText, { opacity: 0.4 }]}
        LinearGradientComponent={LinearGradient}
        animation="wave"
        width={"60%"}
        height={verticalScale(12)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  HeadText: {
    fontFamily: CustomFonts.PoppinsMedium,
    // fontWeight: "500",
    fontSize: verticalScale(18),
    lineHeight: verticalScale(22),
    color: CustomColors.neutral_700,
    // lineHeight:22,
    marginLeft: horizontalScale(12),
    marginTop: verticalScale(12),
    gap: verticalScale(32),
  },
});

export default HeadSkeleton;
