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
import { RaceValue } from "../../utils/common/defaults";
import Select from "../textinputbox/Select";
import { moderateScale, verticalScale } from "../../utils/common/Metrics";
import { CustomFontSize } from "../../utils/common/CustomFont";

const RaceDropdown = ({
  modalVisible,
  setModalVisible,
  handleChange,
  formState,
}) => {
  const navigation = useNavigation();
  const [dispatch, { data, error }] = usePostMutation();
  const dispatchRed = useDispatch();

  const hanldeRace = (race) => {
    handleChange({ race, isOthers: race == "others" });
    setModalVisible(false);
    console.log("clicled posnsjxn ", race, formState);
  };

  useEffect(() => {
    if (data) {
      dispatchRed(clearAuth());
      //   navigation.push("login");
    } else if (error) {
      //   dispatchRed(clearAuth())
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
        onDismiss={() => setModalVisible(false)}
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
              <Text style={styles.titletxt}>Select</Text>
              {RaceValue.map((elements, index) => {
                return (
                  <View key={index}>
                    <Select
                      onPress={() => hanldeRace(elements?.value)}
                      desc={elements?.value}
                      value={elements?.value}
                      variable={elements?.value}
                      isSelected={formState?.race == elements?.value}
                      key={index}
                    />
                  </View>
                );
              })}
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
  titletxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    marginBottom: verticalScale(5),
    lineHeight: verticalScale(18),
    // aligning text left if need to set back to center comment or remove below lines (vb)
    alignSelf: "flex-start",
    marginHorizontal: moderateScale(8),
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

export default RaceDropdown;
