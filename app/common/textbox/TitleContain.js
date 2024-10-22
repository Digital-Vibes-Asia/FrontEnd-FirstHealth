import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import User from "../../assets/icon/User.svg";
import Edit from "../../assets/icon/edit.svg";
import { horizontalScale, verticalScale } from "../../utils/common/Metrics";

const TitleContain = ({ subTitle, isEditable,onPress }) => {
  return (
    <>
      <View style={[{ ...styles.headContainer }]}>
        <View style={[{ ...styles.inlineContainer }]}>
          <User
            width={CustomDimensions.icon_width_20}
            height={CustomDimensions.icon_height_20}
          />
          <Text style={styles.header}>{subTitle}</Text>
        </View>
        {isEditable && (
          <>
            <Pressable
              onPress={onPress}
              style={[{ ...styles.inlineContainer }]}
            >
              <Text style={styles.editText}>Edit</Text>
              <Edit
                width={CustomDimensions.icon_width_15}
                height={CustomDimensions.icon_height_15}
              />
            </Pressable>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(8),
    alignItems: "center",
    marginTop: verticalScale(18),
  },
  inlineContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  header: {
    lineHeight: verticalScale(22),
    fontSize: verticalScale(18),
    fontFamily: CustomFonts.PoppinsMedium,
    color: CustomColors.neutral_700,
    marginHorizontal: horizontalScale(4),
  },

  editText: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(14),
    lineHeight: verticalScale(18),
    marginHorizontal: horizontalScale(4),
    color: CustomColors.new_theme_clr,
  },
});

export default TitleContain;
