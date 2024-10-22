import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import FillButton from "../Button/ButtonFill";
import OutlineIcon from "../Button/OutlineIcon";
import CloseUser from "../../assets/icon/ErrorInfo.svg";
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

const DowngradeAlert = ({ modalVisible, setModalVisible, fetching }) => {
  const navigation = useNavigation()
  const [dispatch, { data, error }] = usePostMutation();
  const dispatchRed = useDispatch()


    const handleDeactivation = () => {
        dispatch({
            url: UrlBase.DOWNGRADE
        })
    }

    useEffect(() => {
        if (data) {
          console.log(data,'downgraded')
          fetching()
          // dispatchRed(clear())
          // navigation.navigate("CloseAccount");
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
                width={CustomDimensions.icon_width_50}
                height={CustomDimensions.icon_height_50}
              ></CloseUser>
              <Text style={styles.modalText}>
              Are you sure you want to downgrade to a Free Plan?
              </Text>
              <Text style={styles.modalDesc}>
              Downgrading to a Free Plan will result in losing your premium member benefits.
              </Text>
              <Text style={styles.modalDesc}>
              Additionally, all your dependants will be removed from your plan and moved to our Free Plan, losing their access to premium benefits. Are you sure you want to proceed?
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <FillButton
                value={"Yes, downgrade to Free Plan"}
                color={CustomColors.error_red}
                onPress={handleDeactivation}
              />
              <NextFhButton
                value={"No, do not downgrade"}
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

export default DowngradeAlert;
