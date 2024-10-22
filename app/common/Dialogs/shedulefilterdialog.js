import { View, StyleSheet, Text, Pressable, Modal, Alert, ScrollView } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useGetQuery } from '../../store/api';
import { UrlBase } from '../../utils/common/urlbase';
import { useEffect, useState } from 'react';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';



export default function SheduleFilterDialog({ dialogStatus, setdialogStatus, close }) {
  const { data: PurposeData, error: PurposeError, isLoading: PurposeLoading, isSuccess: PurposeSuccess, refetch: PurposeRefetch } = useGetQuery(UrlBase.PURPOSE_LIST);

  const [purposlist, setpurposelist] = useState([])






  useEffect(() => {
    PurposeRefetch()
  }, [])


  useEffect(() => {
    if (PurposeData) {
      setpurposelist(PurposeData)
    } else if (PurposeError) {
      Alert.alert("Error", JSON.stringify(PurposeError))

    }
  }, [PurposeData])
  return (


    <Modal
      animationType="slide"
      transparent
      visible={dialogStatus}
      presentationStyle="overFullScreen"
      onDismiss={setdialogStatus}>
      <View style={styles.viewWrapper}>
        <View style={styles.modalView}>
          <Pressable style={styles.close_container} onPress={close}>
            <AntDesign
              name="closecircle"
              size={CustomDimensions.icon_size}
              backgroundColor={CustomColors.white}
              color={CustomColors.red}></AntDesign>
          </Pressable>
          <Text style={styles.titletextstyle}>
            Choose Purpose
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            overScrollMode="never"
            bounces={false}>
            {purposlist.map((item) => {
              return (
                <Pressable key={item.id} style={styles.branch_container} onPress={() => {
                  setdialogStatus(item)
                }}>
                  <Text style={styles.branchstyle}>{item?.purpose}</Text>

                </Pressable>
              )
            })
            }

          </ScrollView>
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
    width: '100%',
    height: "40%",
    bottom: 0,
    elevation: 5,
    backgroundColor: CustomColors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,

  },
  titletextstyle: {
    color: CustomColors.textcolour,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    fontSize: CustomFontSize.normal,    
fontFamily:CustomFonts.RobotoSlabBold,
  },
  close_container: { alignSelf: "flex-end", marginBottom: 5 },


  normaltextstyle: {
    color: CustomColors.textcolour,
    fontSize: 14,

    // textDecorationLine: 'underline',

  },
  branchstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.small,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    maxWidth: "50%",

  
  },
  branch_container: { flexDirection: "row", justifyContent: "space-between", borderColor: CustomColors.bordercolour, borderWidth: 1, padding: 10, borderRadius: 10, marginBottom: 10, }
});
