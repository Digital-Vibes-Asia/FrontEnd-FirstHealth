import { StyleSheet, Text, View } from "react-native";
import { verticalScale } from "../../utils/common/Metrics";
import { CustomColors, CustomFonts } from "../../utils/common/CustomStyles";

const RowView = ({ title, desc }) => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </>
    );
  };

  const styles = StyleSheet.create({
    row: {
        // gap: 32,
        marginTop: verticalScale(4),
        // marginBottom:4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
      },
      title: {
        fontFamily: CustomFonts.PoppinsSemiBold,
        // fontWeight: "500",
        fontSize: verticalScale(14),
        color: CustomColors.neutral_700,
        // width: 'fit-content',
        // maxWidth: "75%",
        lineHeight: verticalScale(18),
      },

 
  desc: {
    fontFamily: CustomFonts.PoppinsRegular,
    // fontWeight: "400",
    fontSize: verticalScale(14),
    color: CustomColors.neutral_600,
    maxWidth: "60%",
    textAlign: "right",
    alignSelf: "flex-end",
  },
  });

  export default RowView