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
import NextFhButton from "../Button/nextfhbutton";
import { moderateScale } from "../../utils/common/Metrics";

const CloseAccountAlert = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation()
  const [dispatch, { data, error }] = usePostMutation();
  const dispatchRed = useDispatch()


    const handleDeactivation = () => {
        dispatch({
            url: UrlBase.CLOSEACCOUNT
        })
    }

    useEffect(() => {
        if (data) {
          dispatchRed(clear())
          navigation.navigate("CloseAccount");
        } else if (error) {
          console.log(error)
          Alert.alert(
            JSON.stringify(error?.status),
            JSON.stringify(error?.data?.message)
          );
        }
      }, [data, error]);
      
  return (
    <>
      <Modal
        presentationStyle="overFullScreen"
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.whole_container}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modelContent}>
              <CloseUser
                width={moderateScale(64)}
                height={moderateScale(64)}
              ></CloseUser>
              <Text style={styles.modalText}>
                You are about to close your First Health account
              </Text>
              <Text style={styles.modalDesc}>
                Are you sure you want to close your account? If you’re having
                problems, please contact our First Health support for help.
              </Text>
              <Text style={styles.modalDesc}>
                Closing your account will permanently delete all information
                stored.{" "}
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <FillButton
                value={"Yes, close my account permanently"}
                color={CustomColors.error_red}
                onPress={handleDeactivation}
              />
              <OutlineIcon
                value={"No, I’ve changed my mind"}
                onPress={() => setModalVisible(false)}
                icon={false}
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

    backgroundColor: "#fff",
    opacity:1,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
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
    lineHeight:18,
    marginVertical: 4
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
  whole_container: { backgroundColor: "#000", flex: 1, opacity:0.9}
});

export default CloseAccountAlert;
