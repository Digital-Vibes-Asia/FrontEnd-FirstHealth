import { Image, StyleSheet, Text, View } from "react-native";
import { horizontalScale, verticalScale } from "../../utils/common/Metrics";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import RightArrow from "../../assets/icon/rightarrow.svg";
import { useCallback } from "react";
import Scheduled from "../../assets/icon/scheduledIcon.svg";
import Outgoing from "../../assets/icon/outgoingCall.svg";
import Request from "../../assets/icon/ambReq.svg";
import Cancelled from "../../assets/icon/ambCancelled.svg";
import ContentRight from "../../assets/icon/contentRight.svg";

const ActivityCard = ({ headText, subHead, desc, id }) => {
  const RenderIcon = useCallback(() => {
    switch (id) {
      case 2:
        return (
          <View>
            <Scheduled
              width={CustomDimensions.icon_width_50}
              height={CustomDimensions.icon_height_50}
            />
          </View>
        );
      case 6:
        return (
          <View>
            <Outgoing
              width={CustomDimensions.icon_width_50}
              height={CustomDimensions.icon_height_50}
            />
          </View>
        );
      case 1:
        return (
          <View>
            <Request
              width={CustomDimensions.icon_width_50}
              height={CustomDimensions.icon_height_50}
            />
          </View>
        );
      case 3:
        return (
          <View>
            <Cancelled
              width={CustomDimensions.icon_width_50}
              height={CustomDimensions.icon_height_50}
            />
          </View>
        );
      case 4:
        return (
          <View>
            <Cancelled
              width={CustomDimensions.icon_width_50}
              height={CustomDimensions.icon_height_50}
            />
          </View>
        );
      default:
        break;
    }
  }, [id]);
  return (
    <View style={styles.container}>
      <View style={styles.dispContainer}>
        <View style={[styles.dispContainer, { justifyContent: "" }]}>
          {RenderIcon()}

          <View style={styles.textContainer}>
            <Text style={styles.header}>{headText}</Text>
            <Text style={styles.subtext}>{subHead}</Text>
            <Text style={styles.description}>{desc}</Text>
          </View>
        </View>
        {id == 2 ? (
          <>
            <ContentRight
              width={CustomDimensions.icon_width_40}
              height={CustomDimensions.icon_height_40}
            />
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: horizontalScale(4),
    borderWidth: verticalScale(1),
    borderColor: CustomColors.neutralgrey_200,
    padding: verticalScale(12),
    gap: verticalScale(8),
  },
  dispContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: horizontalScale(10),
    alignItems: "center",
  },
  header: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontSize: verticalScale(14),
    lineHeight: verticalScale(18),
    color: CustomColors.neutral_700,
  },
  subtext: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(14),
    color: CustomColors.neutral_600,
    lineHeight: verticalScale(18),
  },
  description: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(10),
    lineHeight: verticalScale(12),
  },
  textContainer: {
    gap: verticalScale(2),
  },
});

export default ActivityCard;
