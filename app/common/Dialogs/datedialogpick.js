import { View, StyleSheet, Text, Pressable, Modal, Button } from 'react-native';

import { CustomColors } from '../../utils/common/CustomColors';
import CloseButton from '../Button/closebutton';
import DateTimePicker from 'react-native-ui-datepicker';
import { useState } from 'react';
import { CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomFont';


export default function DateDialogPick({ dialogStatus, setdialogStatus, date }) {

  console.log(JSON.stringify(date) + " Date...")

  let inputdate = date ? new Date(date) : new Date()


  return (
    <Modal
      animationType="slide"
      transparent
      visible={dialogStatus}
      presentationStyle="overFullScreen"
      onDismiss={setdialogStatus}>
      <View style={styles.viewWrapper}>
        <View style={styles.modalView}>

          <DateTimePicker
            mode="single"
            locale="en"
            calendarTextStyle={{ color: CustomColors.textcolour, fontFamily: CustomFonts.RobotoSlabRegular, fontSize: CustomFontSize.normal }}
            headerTextStyle={{ color: CustomColors.white, fontFamily: CustomFonts.RobotoSlabBlack, fontSize: CustomFontSize.title }}
            weekDaysTextStyle={{ color: CustomColors.textcolour, fontFamily: CustomFonts.RobotoSlabMedium, fontSize: CustomFontSize.title }}
            selectedTextStyle={{ color: CustomColors.white, fontFamily: CustomFonts.RobotoSlabBold, fontSize: CustomFontSize.normal }}
            selectedItemColor={CustomColors.button_colour}
            headerButtonColor={CustomColors.white}
            headerContainerStyle={{ backgroundColor: CustomColors.button_colour, borderRadius: CustomDimensions.brad_10 }}
            date={inputdate}
            onChange={(e) => {
              setdialogStatus(e.date)
              // sets(e.startDate)
              // sete(e.endDate)
            }}
          />




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
    top: '30%',
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
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40,

    fontWeight: 'bold',
  },
});
