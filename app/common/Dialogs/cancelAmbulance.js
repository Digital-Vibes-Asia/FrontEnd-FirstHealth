import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Modal } from "react-native";
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
import AlertIcon from "../../assets/icon/alertIcon2.svg";
import { Text } from "react-native";

export default function CancelAmbulance({ onyes, onno, dialog }) {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={dialog}
        onRequestClose={() => {}}
      >
        <View style={styles.whole_container}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modelContent}>
                <View style={{paddingVertical:verticalScale(10)}}>
                <AlertIcon />
                </View>
                <Text style={styles.alertTitle}>
                  Are you sure you want to cancel your scheduled ambulance?
                </Text>
                <Text style={styles.alertContent}>
                  You will need to call our hotline again should you wish to
                  schedule another ambulance
                </Text>
              </View>
              <View style={{ width: "100%" }}>
                <Pressable
                  style={styles.container1}
                  android_ripple={styles.ripple_colour}
                  onPress={onyes}
                >
                  <Text style={[styles.button, { color: CustomColors.white }]}>
                    {"Yes, cancel scheduled ambulance"}
                  </Text>
                </Pressable>
              </View>
              <View style={{ width: "100%" }}>
                <Pressable
                  style={styles.container}
                  android_ripple={styles.ripple_colour}
                  onPress={onno}
                >
                  <Text style={styles.button}>
                    {"Keep my scheduled ambulance"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  alertTitle: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: CustomFontSize.large_title,
    color: CustomColors.neutral_700,
    fontWeight: "400",
    textAlign: "center",
  },
  alertContent: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_700,
    textAlign:'center'
  },
  container: {
    borderColor: CustomColors.theme_clr,
    padding: moderateScale(12),
    borderRadius: moderateScale(32),
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container1: {
    backgroundColor: CustomColors.error_red,
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(32),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical:verticalScale(15)
  },

  centeredView: {
    position: "absolute",
    opacity: 1,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
  },
  button: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    paddingRight: horizontalScale(10),
    fontWeight: "600",
  },
  modalText: {
    marginVertical: 8,
    textAlign: "center",
    lineHeight: 28,
    // fontWeight: "400",
    fontSize: 24,
    fontFamily: CustomFonts.PoppinsRegular,
    color: CustomColors.neutral_700,
  },
  modalDesc: {
    fontFamily: CustomFonts.PoppinsRegular,
    textAlign: "center",
    fontSize: 14,
    color: CustomColors.neutral_700,
    lineHeight: 18,
    marginVertical: 4,
  },
  modalView: {
    width: CustomDimensions.screenWidth,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modelContent: {
    margin: 8,
    alignItems: "center",
  },
  whole_container: { backgroundColor: "#000", flex: 1, opacity: 0.9 },
});
