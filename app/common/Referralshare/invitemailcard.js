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
import Progressing from '../Progress/Progressing';


export default function InviteMailCard({ hint, value, onchange, onPress, progress }) {
  return (

    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginRight: horizontalScale(10) }}>
          <Mail width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Mail>
        </View>
        <Text style={styles.title}>{"SEND INVITE VIA E-MAIL"}</Text>
      </View>
      <View style={{ marginTop: verticalScale(10) }}>
        <Text style={styles.longtxt}>{"Invite someone to join your plan by sending them an email. They can register easily through the link provided."}</Text>
      </View>
      <View style={{ marginTop: verticalScale(10) }}>
        <FhInputBox hint={hint} value={value}
          editable={true}
          onChangeText={onchange}></FhInputBox>
      </View>
      <View style={{ marginTop: verticalScale(10) }}>
        {!progress ?
          <InviteButton
            value={'Send Invite'}
            onPress={() => {
              onPress()
            }}></InviteButton>
          : <Progressing></Progressing>}
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
