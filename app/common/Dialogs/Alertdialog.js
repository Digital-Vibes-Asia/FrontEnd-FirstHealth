import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';

import { CustomColors } from '../../utils/common/CustomColors';
import CloseButton from '../Button/closebutton';
import OkButton from "../../common/Button/okbutton"
import { CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomFont';

export default function AlertDialog({ dialogStatus, setdialogStatus, text, btext }) {
  console.log('Anbu');
  return (
    <Modal
      animationType="slide"
      transparent
      visible={dialogStatus}
      presentationStyle="overFullScreen"
      onDismiss={setdialogStatus}>
      <View style={styles.viewWrapper}>
        <View style={styles.modalView}>
          <View style={{ alignSelf: "flex-start" }}>
            <Text style={styles.boldtextstyle}>Alert !</Text>
            <Text style={styles.descstyle}>
              {text}
            </Text>
          </View>

          <View style={{ alignSelf: "flex-end" }}>
            <OkButton value={btext} onPress={setdialogStatus}></OkButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: "#000", flex: 1, opacity:0.9
  },
  modalView: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    elevation: 5,
    backgroundColor: CustomColors.white,
    borderRadius: 7,
    padding: CustomDimensions.pad_20,
    alignItems: 'center',
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.RobotoSlabBold,
    marginBottom: CustomDimensions.mar_10,
  },
  descstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
    marginBottom: CustomDimensions.mar_20,
  },
});
