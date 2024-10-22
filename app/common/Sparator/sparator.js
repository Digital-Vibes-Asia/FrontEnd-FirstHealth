import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomColors, CustomFonts, CustomFontSize } from "../../utils/common/CustomStyles";
import { horizontalScale } from "../../utils/common/Metrics";

const Separator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.separatorText}>OTHER BENEFITS</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc", // Adjust color as needed
  },
  separatorText: {
    marginHorizontal: horizontalScale(10), // Space between the lines and the text
    fontSize: CustomFontSize.normal_12,
    color: CustomColors.neutral_500, // Adjust color as needed
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: '600',
  },
});

export default Separator;
