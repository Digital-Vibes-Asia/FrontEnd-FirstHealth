import { View, StyleSheet, Text, Pressable, Modal, Alert } from "react-native";
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
import RemoveButton from "../../common/Button/removeButton.js";
import { usePostMutation } from "../../store/api.js";
import { UrlBase } from "../../utils/common/urlbase.js";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function RemoveDependantDialog({
  show,
  setShow,
  txt,
  txt2,
  screen,
  status,
  userId,
  reg_id,
  email,
}) {
  const [dispatch, { data, error }] = usePostMutation();

  const navigation = useNavigation();

  // Dependant Remove
  const handleRemove = () => {
    if (reg_id) {
      dispatch({
        data: { reg_id: reg_id },
        url: UrlBase.REMOVEMANUALUSER,
      });
    } else {
      dispatch({
        data: { dependent_id: show?.dependent_id },
        url: UrlBase.REMOVEDEPENDANT,
      });
    }
  };

  // Dependant Revoke
  const handleRevoke = () => {
    dispatch({
      url: UrlBase.REVOKEINVITE + `${userId}`,
    });
  };

  useEffect(() => {
    if (data) {
      setShow({
        isOn: false,
        dependent_id: null,
      });
      navigation.navigate("main", {
        screen: "Subscription",
      });
    } else if (error) {
      console.log(error, "asksb");
      Alert.alert("Error", JSON.stringify(error.data.message));
    }
  }, [data, error]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={show.isOn}
        onRequestClose={() => {
          setShow({
            isOn: false,
            dependent_id: null,
          });
        }}
      >
        <View style={styles.whole_container}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modelContent}>
                <View style={{ paddingVertical: verticalScale(10) }}>
                  <AlertIcon />
                </View>
                <Text style={styles.alertTitle}>
                  {`Are you sure you want to ${
                    status === 1
                      ? "revoke this invte?"
                      : "remove this dependant?"
                  }`}
                </Text>
                <Text style={styles.alertContent}>
                  You will forfeit all associated benefits and any payments made
                  for this slot.
                </Text>
              </View>
              <View style={{ width: "100%" }}>
                <RemoveButton
                  value={txt}
                  screen={screen}
                  onPress={status === 0 ? handleRemove : handleRevoke}
                  status={status}
                />
              </View>
              <View style={{ width: "100%" }}>
                <Pressable
                  style={styles.container}
                  android_ripple={styles.ripple_colour}
                  onPress={() =>
                    setShow({
                      isOn: false,
                      dependent_id: null,
                    })
                  }
                >
                  <Text style={styles.button}>{txt2}</Text>
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
    borderColor: CustomColors.theme_clr,
    padding: moderateScale(12),
    borderRadius: moderateScale(32),
    borderWidth: 1,
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
    color: CustomColors.new_theme_clr,
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
  whole_container: { backgroundColor: "#000", flex: 1, opacity: 0.9 },
});
