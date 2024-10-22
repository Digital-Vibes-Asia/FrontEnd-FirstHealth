import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';

import { CustomColors } from '../../utils/common/CustomColors';
import InvalidButton from '../Button/InvalidButton';
import { CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomFont';

export default function InvalidTokenDialog({ dialogStatus, setdialogStatus, text, btext }) {
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
            <InvalidButton value={btext} onPress={setdialogStatus}></InvalidButton>
          </View>
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
    borderRadius: 7,
    padding: 20,
    alignItems: 'center',
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.title,    
    fontFamily:CustomFonts.RobotoSlabBold,
    marginBottom: 10,
  },
  descstyle: {
    color: CustomColors.textcolour,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 20,
  },
});
