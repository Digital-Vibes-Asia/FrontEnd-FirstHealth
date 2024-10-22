import { StyleSheet, Pressable, Text, View, TextInput } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/common/Metrics';
import Telegram from "../../assets/icon/telegram.svg"
import Whatsapp from "../../assets/icon/whatsapp.svg"
import Share from '../../assets/icon/share.svg'
import Copy from "../../assets/icon/copy.svg"
import Mail from "../../assets/icon/thememail.svg"
import FhInputBox from '../textinputbox/fhinputbox';
import InviteButton from '../Button/invitebutton';
import ManualRegisterButton from '../Button/manualregisterbutton';
import Edit from "../../assets/icon/manualedit.svg"


export default function ManualRegistrationCard({ hint, value, onchange, onPress }) {
  return (

    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginRight: horizontalScale(10) }}>
          <Edit width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Edit>
        </View>
        <Text style={styles.title}>{"MANUAL REGISTRATION"}</Text>
      </View>
      <View style={{ marginTop: verticalScale(10) }}>
        <Text style={styles.longtxt}>{"Add a dependant to your plan yourself. Ideal for those without an email address or mobile device"}</Text>
      </View>
    
      <View style={{ marginTop: verticalScale(10) }}>
        <ManualRegisterButton
          value={'Register'}
          onPress={() => {
            onPress()
          }}></ManualRegisterButton>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: CustomColors.neutralgrey_200,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    borderRadius: moderateScale(20),
    backgroundColor: CustomColors.white
  },
  title: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: moderateScale(14)
  },
  longtxt: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: moderateScale(18)
  },


  shadowProp: {
    shadowColor: CustomColors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  elevation: {
    elevation: 20,
    shadowColor: CustomColors.black,
  },





});
