import { Skeleton } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import LinearGradient from "react-native-linear-gradient";
import { horizontalScale, verticalScale } from "../../utils/common/Metrics";

const EditSkeleton = () => {
  return (
    <>
      <Skeleton
        style={[
          styles.HeadText,
          { opacity: 0.4, marginVertical: verticalScale(4) },
        ]}
        LinearGradientComponent={LinearGradient}
        animation="wave"
        width={"40%"}
        height={verticalScale(12)}
      />
      <Skeleton
        style={[
          styles.HeadText,
          { opacity: 0.4, marginVertical: verticalScale(4) },
        ]}
        LinearGradientComponent={LinearGradient}
        animation="wave"
        circle
        width={CustomDimensions.icon_width_20}
        height={CustomDimensions.icon_height_20}
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
    marginLeft: horizontalScale(4),
    marginTop: verticalScale(8),
    gap: verticalScale(32),
  },
});

export default EditSkeleton;
