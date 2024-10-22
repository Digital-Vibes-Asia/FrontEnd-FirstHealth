import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import FillButton from "../Button/ButtonFill";
import OutlineIcon from "../Button/OutlineIcon";
import CloseUser from "../../assets/icon/closeUser.svg";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { usePostMutation } from "../../store/api";
import { UrlBase } from "../../utils/common/urlbase";
import { useEffect } from "react";
import FhLoginButton from "../Button/fhloginbutton";
import FhCancelButton from "../Button/fhcancelbutton";
import { verticalScale, horizontalScale, moderateScale } from "../../utils/common/Metrics";
import AlertInfo from "../AlertBox/alertinfo";

const AreYouSure = ({ modalVisible, setModalVisible, count, onyes, onno }) => {

  return (
    <>
      <Modal
        presentationStyle="overFullScreen"
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={setModalVisible}
      >
        <View style={styles.whole_container}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ marginTop: "5%" }}>
                <AlertInfo></AlertInfo>
              </View>
              <Text style={styles.modalText}>
                Are you sure you’re done ?
              </Text>
              <Text style={styles.modalDesc}>
                you have
                <Text style={[styles.modalDesc, { fontFamily: CustomFonts.PoppinsSemiBold, }]}> {count} unfilled slot(s)</Text> You can still add them later in your Subscription panel
              </Text>
              <FhLoginButton
                value={"Yes, I'm Done"}
                onPress={onyes}
              />
              <View style={{ marginTop: verticalScale(10) }}>
                <FhCancelButton
                  value={"No, let me continue adding"}
                  onPress={onno}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modalText: {
    textAlign: "center",
    lineHeight: verticalScale(28),
    fontSize: CustomFontSize.large_title,
    fontFamily: CustomFonts.PoppinsRegular,
    color: CustomColors.neutral_700,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10)

  },
  modalDesc: {
    textAlign: "center",
    lineHeight: verticalScale(18),
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    color: CustomColors.neutral_700,
    marginBottom: verticalScale(10)
  },
  modalView: {
    backgroundColor: CustomColors.white,
    borderTopRightRadius: moderateScale(16),
    borderTopLeftRadius: moderateScale(16),
    paddingVertical: verticalScale(10),
    paddingHorizontal: verticalScale(10)
  },

  whole_container: { backgroundColor: "#000", flex: 1, opacity:0.9}
});

export default AreYouSure;
