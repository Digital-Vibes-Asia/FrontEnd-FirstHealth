import * as React from "react";
import { View, StyleSheet, ImageBackground, Pressable } from "react-native";
import { Card, Text, Button, IconButton } from "react-native-paper";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/common/Metrics";
import { useNavigation } from "@react-navigation/native";

import PhoneIcon from "../../assets/icon/phoneIcon2.svg";
import AmbulanceIcon from "../../assets/icon/ambulanceIcon.svg";

import HomeIcon from "../../assets/icon/homeicon.svg";
import Location from "../../assets/icon/location.svg";

import CallHotlineButton from "../../common/Button/callhotline";

export default function CallHoldingScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/map.png")}
        style={styles.background}
        imageStyle={{ opacity: 0.2 }}
      >
        <Pressable
          style={styles.container}
          onPress={() => {
            navigation.navigate("dir");
          }}
        >
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.iconRow}>
                <View>
                  <PhoneIcon
                    width={CustomDimensions.icon_width_40}
                    height={CustomDimensions.icon_height_40}
                  />
                </View>

                <View style={styles.separator} />

                <View>
                  <AmbulanceIcon
                    width={CustomDimensions.icon_width_40}
                    height={CustomDimensions.icon_height_40}
                  />
                </View>

                <View style={styles.separator} />

                <View>
                  <HomeIcon
                    width={CustomDimensions.icon_width_40}
                    height={CustomDimensions.icon_height_40}
                  />
                </View>
              </View>

              {/* Main Title */}
              <Text style={styles.title}>Arranging an ambulance</Text>

              {/* Subtext */}
              <Text
                style={[styles.subtitle, { marginBottom: moderateScale(10) }]}
              >
                We are currently coordinating the dispatch of an ambulance for
                you.
              </Text>
              <Text style={styles.subtitle}>
                This screen will automatically update as soon as the ambulance
                is on the way to you.
              </Text>

              {/* Destination Information */}
              {/* <View style={styles.locat}>
                <View style={{paddingRight:moderateScale(10)}}>
                </View>
                <View>
                  <Text style={styles.destinationLabel}>DESTINATION</Text>
                  <Text style={styles.destination}>
                    18 Jalan Ara SD 7/3e{"\n"}
                    Bandar Sri Damansara{"\n"}
                    52200 Petaling Jaya, Selangor
                  </Text>
                </View>
              </View> */}
              <View style={styles.playContainer}>
                <Location
                  width={CustomDimensions.icon_width_20}
                  height={CustomDimensions.icon_height_20}
                ></Location>
                <View style={{ marginHorizontal: horizontalScale(10) }}>
                  <Text style={styles.departedtxt}>{"DESTINATION"}</Text>
                  <Text style={styles.ttiletxt2}>{"18 Jalan Ara SD 7/3e"}</Text>
                  <Text style={styles.ttiletxt}>{"Bandar Sri Damansara"}</Text>
                  <Text style={styles.ttiletxt}>
                    {"52200 Petaling Jaya, Selangor"}
                  </Text>
                </View>
              </View>
            </Card.Content>

            {/* Call Hotline Button */}
            <Card.Actions>
              <View style={{ marginTop: verticalScale(20), width: "100%" }}>
                <CallHotlineButton value={"Call Hotline"}></CallHotlineButton>
              </View>
            </Card.Actions>
          </Card>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Make the image cover the whole background
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: "white",
    borderWidth: moderateScale(1),
    borderColor: CustomColors.bordercolour,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(10),
  },
  iconButton: {
    alignSelf: "center",
  },
  separator: {
    width: moderateScale(80),
    height: moderateScale(3),
    backgroundColor: "#D1D6DC", // Gray separator color
    borderRadius: 5,
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    marginBottom: moderateScale(10),
    fontFamily: CustomFonts.PoppinsSemiBold,
    color: CustomColors.neutral_700,
  },
  subtitle: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
    marginBottom: 20,
  },
  destinationLabel: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: 12,
    color: "purple",
    fontWeight: "bold",
    marginBottom: 5,
  },
  destination: {
    fontSize: 14,
    color: "black",
    marginBottom: 20,
  },
  button: {
    borderColor: "purple",
    borderWidth: 1,
    width: "100%",
  },
  buttonText: {
    color: "purple",
  },
  locat: {
    flexDirection: "row",
  },
  playContainer: {
    flexDirection: "row",
  },
  ttiletxt: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(14),
    marginBottom: verticalScale(1),
  },
  ttiletxt2: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.txt_18,
    fontFamily: CustomFonts.PoppinsSemiBold,
  },
  departedtxt: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
  },
});
