import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';

import { CustomColors } from '../../utils/common/CustomColors';
import CloseButton from '../Button/closebutton';
import { CustomFonts, CustomFontSize, CustomDimensions } from '../../utils/common/CustomFont';

export default function ConfirmDialog({ dialogStatus, setdialogStatus, text }) {
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
          <Text style={styles.boldtextstyle}>
            {text}
          </Text>
          <CloseButton value={'Close'} onPress={setdialogStatus}></CloseButton>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    
  },
  modalView: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    elevation: 5,
    
    
    backgroundColor: CustomColors.white,
    borderRadius: CustomDimensions.brad_10,
    padding: CustomDimensions.pad_10,
    alignItems: 'center',
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabBold,
    marginTop: CustomDimensions.mar_20,
    marginBottom: CustomDimensions.mar_40,

  },
});
