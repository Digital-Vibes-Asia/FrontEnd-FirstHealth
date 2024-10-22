import { Platform } from "react-native";

export const CustomFonts = {
  PoppinsBlackItalic: "Poppins Black Italic",
  PoppinsExtraBold: "Poppins ExtraBold",
  PoppinsLight: "Poppins Light",
  PoppinsMedium: "Poppins Medium",
  PoppinsRegular: "Poppins Regular",
  PoppinsBold: "Poppins Bold",
  PoppinsSemiBold: "Poppins SemiBold",
  RobotoSlabBlack: "Roboto Slab Black",
  RobotoSlabBold: "Roboto Slab Bold",
  RobotoSlabExtraBold: "Roboto Slab ExtraBold",
  RobotoSlabExtraLight: "Roboto Slab ExtraLight",
  RobotoSlabLight: "Roboto Slab Light",
  RobotoSlabMedium: "Roboto Slab Medium",
  RobotoSlabRegular: "Roboto Slab Regular",
  RobotoSlabSemiBold: "Roboto Slab SemiBold",
  RobotoSlabThin: "Roboto Slab Thin",
};

export const CustomFontSize = {
  title: Platform.OS == "ios" ? 14 : 16,
  normal: Platform.OS == "ios" ? 12 : 14,
  small: Platform.OS == "ios" ? 10 : 12,
};

export const CustomDimensions = {
  pad_10: Platform.OS == "ios" ? 8 : 8,
  bpad_10: 10,
  pad_25: 25,
  pad_20: 20,
  pad_5: 5,
  mar_5: 5,
  mar_10: 10,
  mar_20: 20,
  mar_40: 40,
  marp_50: "50%",
  marp_5: "5%",
  marp_10: "10%",
  marp_25: "25%",
  bwidth_2: 2,
  bwidth_1: 1,
  brad_10: 10,
  brad_50: 50,
  brad_32: 32,
  brad_5: 5,
  icon_size: 20,
  icon_size_15: 15,
  icon_size_30: Platform.OS == "ios" ? 20 : 30,
  flex: 1,

  iwr_200: Platform.OS == "ios" ? 150 : 200,
  ihr_50: Platform.OS == "ios" ? 40 : 50,
  width: "70%",
  width_60: "60%",
  width_80: "80%",
  width_40: 40,
  width_100: 100,
  width_150: 150,
  width_200: 200,
  height: 30,
  height_50: Platform.OS == "ios" ? 40 : 50,
  width_150: Platform.OS == "ios" ? 150 : 200,
  height_150: Platform.OS == "ios" ? 150 : 160,

  iwr_400: Platform.OS == "ios" ? 200 : 100,
  iwr_50: Platform.OS == "ios" ? 40 : 50,

  iwhr_80: 80,

  padd_5: Platform.OS == "ios" ? 5 : 0,
  margin_20: Platform.OS == "ios" ? 10 : 20,
};
