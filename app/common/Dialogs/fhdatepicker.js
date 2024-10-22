import { View, StyleSheet, Text, Pressable, Modal, Button } from 'react-native';
import CloseButton from '../Button/closebutton';
import DateTimePicker from 'react-native-ui-datepicker';
import { useState } from 'react';
import { CustomColors, CustomFontSize, CustomDimensions, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';
import CloseIcon from "../../assets/icon/closeicon"


export default function FhDatePicker({ dialogStatus, setdialogStatus, date, close }) {

  console.log(JSON.stringify(date) + " Date...")

  let inputdate = date ? new Date(date) : new Date()


  return (
    <>

      <Modal
        animationType="slide"
        transparent
        visible={dialogStatus}
        presentationStyle="overFullScreen"
        onDismiss={setdialogStatus}>
        <View style={styles.viewWrapper}>

          <View style={styles.container}>
            <Pressable style={{ marginBottom: 10 }} onPress={close}>
              <CloseIcon width={CustomDimensions.icon_width_40} height={CustomDimensions.icon_height_40}></CloseIcon>
            </Pressable>
            <View style={styles.modalView}>
              <DateTimePicker
                mode="single"
                locale="en"
                maxDate={new Date()}
                calendarTextStyle={{
                  color: CustomColors.new_theme_clr,
                  fontSize: CustomFontSize.normal,
                  fontFamily: CustomFonts.PoppinsMedium,
                  // alignSelf:"center",
                  textAlign: "center",
                  lineHeight: verticalScale(18)
                }}
                headerTextStyle={{
                  color: CustomColors.new_titile_clr,
                  fontSize: CustomFontSize.txt_22,
                  fontFamily: CustomFonts.PoppinsMedium,
                  lineHeight: verticalScale(24)
                }}
                weekDaysTextStyle={{
                  color: CustomColors.new_titithele_clr,
                  fontSize: CustomFontSize.normal,
                  fontFamily: CustomFonts.PoppinsMedium,
                  // alignSelf:"center",
                  textAlign: "center",
                  lineHeight: verticalScale(18)
                }}
                selectedTextStyle={{ color: CustomColors.white, fontFamily: CustomFonts.PoppinsSemiBold, fontSize: CustomFontSize.normal, }}
                selectedItemColor={CustomColors.theme_clr}
                headerButtonColor={CustomColors.theme_clr}
                headerButtonsPosition={"right"}
                headerContainerStyle={{ backgroundColor: CustomColors.white, paddingHorizontal: 10 }}
                date={inputdate}
                onChange={(e) => {
                  setdialogStatus(e.date)
                  // sets(e.startDate)
                  // sete(e.endDate)
                }}
              />
              {/* <CloseButton value={"Close"} onPress={close}></CloseButton> */}




            </View>
          </View>

        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',

  },

  modalView: {
    backgroundColor: CustomColors.white,
    paddingTop: 10,

    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    alignItems: "center"

  }

});
