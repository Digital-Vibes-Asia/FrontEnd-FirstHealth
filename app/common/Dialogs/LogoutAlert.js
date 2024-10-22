import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import FillButton from "../Button/ButtonFill";
import OutlineIcon from "../Button/OutlineIcon";
import Exclaimation from "../../assets/icon/Exclamation.svg";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import { UrlBase } from "../../utils/common/urlbase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { usePostMutation } from "../../store/api";
import NextFhButton from "../Button/nextfhbutton";
import { clearAuth } from "../../store/value";
import { horizontalScale, moderateScale } from "../../utils/common/Metrics";

const LogoutAlert = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();
  const [dispatch, { data, error }] = usePostMutation();
  const dispatchRed = useDispatch();

  const handleLogout = () => {
    setModalVisible(false);
    dispatch({
      url: UrlBase.LOGOUT,
    });
  };

  useEffect(() => {
    if (data) {
      setModalVisible(false);
      dispatchRed(clearAuth());
      //   navigation.push("login");
    } else if (error) {
      dispatchRed(clearAuth());
      console.log(error, "logout eerror");
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message)
      );
    }
  }, [data, error]);

  return (
    <>
      <Modal
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
                <Exclaimation
                  width={moderateScale(64)}
                  height={moderateScale(64)}
                ></Exclaimation>
                <Text style={styles.modalText}>
                  Are you sure you want to logout?
                </Text>
                <Text style={styles.modalDesc}>
                  You will need to login again to access your account
                </Text>
              </View>
              <View style={{ width: "100%" }}>
                <FillButton value={"Yes, logout"} onPress={handleLogout} />
                <OutlineIcon
                  value={"No, keep me logged in"}
                  icon={false}
                  onPress={() => setModalVisible(false)}
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
    opacity: 1,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
  },
  modalText: {
    marginVertical: 4,
    textAlign: "center",
    lineHeight: 28,
    fontSize: 24,
    fontFamily: CustomFonts.PoppinsMedium,
    color: CustomColors.neutral_700,
  },
  modalDesc: {
    color: CustomColors.neutral_700,
    fontFamily: CustomFonts.PoppinsRegular,
    textAlign: "center",
    lineHeight: 18,
  },
  modalView: {
    width: CustomDimensions.screenWidth,
    backgroundColor: "white",
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    padding: moderateScale(16),
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

export default LogoutAlert;
