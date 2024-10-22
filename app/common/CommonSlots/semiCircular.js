import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import Svg, { Path, G } from "react-native-svg"; // Import G for grouping and transformation
import {
  CustomColors,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";

const SemiCircularProgress = ({
  percentage,
  radius,
  strokeWidth,
  progressColor,
  backgroundColor,
  rotateDegrees, // Add a prop to define rotation degrees
  remainEmerCalls,
}) => {
  const centerX = radius;
  const centerY = radius;
  const normalizedPercentage = Math.max(0, Math.min(percentage, 100)); // Ensure percentage is between 0 and 100
  const startAngle = 270; // Start at the bottom (270 degrees)
  const endAngle = startAngle + (normalizedPercentage / 100) * 180; // Calculate end angle based on percentage

  // Function to describe the arc for the semi-circle
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, startAngle); // Start point at 270
    const end = polarToCartesian(x, y, radius, endAngle); // End point at calculated percentage
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
    ].join(" ");
  };

  // Convert polar coordinates to cartesian
  const polarToCartesian = (x, y, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0; // Adjust to start at 90 degrees
    return {
      x: x + radius * Math.cos(angleInRadians),
      y: y + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Svg
        height={80} // Adjust height to fit only the semi-circle
        width={radius * 2} // Keep the width full for the semi-circle
        viewBox={`0 0 ${radius * 2} ${radius}`} // Only show top half of the SVG
      >
        <G transform={`rotate(${rotateDegrees}, ${centerX}, ${centerY})`}>
          {/* Background semi-circle */}
          <Path
            d={describeArc(
              centerX,
              centerY,
              radius - strokeWidth / 2,
              startAngle,
              startAngle + 180
            )} // Background arc
            stroke={backgroundColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress semi-circle */}
          <Path
            d={describeArc(
              centerX,
              centerY,
              radius - strokeWidth / 2,
              startAngle,
              endAngle
            )} // Progress arc
            stroke={progressColor}
            fill="transparent"
            strokeWidth={percentage === 0 ? "" : strokeWidth}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      {/* Display percentage text */}
      <View
        style={{
          position: "absolute",
          top: radius / 2, // Adjust to position the text correctly
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.rangeNum}>{remainEmerCalls}</Text>
      </View>
    </View>
  );
};

export default SemiCircularProgress;

const styles = StyleSheet.create({
  rangeNum: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontSize: CustomFontSize.size_32,
    color: "#404040",
  },
});
