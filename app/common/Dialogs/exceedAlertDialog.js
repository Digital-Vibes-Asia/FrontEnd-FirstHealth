import { View, StyleSheet, Text, Pressable, Modal } from "react-native";
import AlertIcon from "../../assets/icon/alertIcon2.svg";
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

export default function ExceedAlertDialog({ isShow, setShow }) {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={isShow}
        onRequestClose={() => {
          setShow(false);
        }}
      >
        <View style={styles.whole_container}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modelContent}>
                <View style={{ paddingVertical: verticalScale(10) }}>
                  <AlertIcon />
                </View>
                <Text style={styles.alertTitle}>Limit Exceeded</Text>
                <Text style={styles.alertContent}>
                  You have reached the maximum limit of 10 slots
                </Text>
              </View>
              <View style={{ width: "100%" }}>
                <Pressable
                  style={styles.container}
                  android_ripple={styles.ripple_colour}
                  onPress={() => setShow(false)}
                >
                  <Text style={styles.button}>Ok</Text>
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
    textAlign: "center",
  },
  container: {
    backgroundColor: CustomColors.new_theme_clr,
    padding: moderateScale(12),
    borderRadius: moderateScale(32),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    // lineHeight: verticalScale(19),
    paddingRight: horizontalScale(10),
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
  whole_container: { backgroundColor: "#000", flex: 1, opacity: 1 },
});
