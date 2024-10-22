import { StyleSheet, Pressable, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/common/Metrics';
import Telegram from "../../assets/icon/telegram.svg"
import Whatsapp from "../../assets/icon/whatsapp.svg"
import Share from '../../assets/icon/share.svg'
import Copy from "../../assets/icon/copy.svg"


export default function ShareCard({ tclick, code,wclick, cclick,sclick }) {
  return (
    <View style={styles.whole_container}>
      <View style={styles.container}>
        <Text style={styles.title}>SHARE REFERRAL LINK</Text>
        <View style={styles.copycontainer}>
          <View style={styles.box}>
            <Text style={styles.referral}>{code}</Text>
          </View>
          <Pressable style={styles.round} onPress={cclick}>
            <Copy width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Copy>

          </Pressable>
          <Pressable style={styles.round} onPress={sclick}>
            <Share width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Share>
          </Pressable>
        </View>
        <Text style={styles.desc}>Invite someone to join your plan by sharing your referral number with them. They can register easily through the link provided.</Text>
        <Text style={styles.title}>SHARE VIA</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable style={[styles.app, { backgroundColor: CustomColors.whatsapp }]} onPress={wclick}>
            <Text style={styles.app_name}>WhatsApp</Text>
            <Whatsapp width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Whatsapp>
          </Pressable>
          <Pressable style={[styles.app, { backgroundColor: CustomColors.telegram }]} onPress={tclick}>
            <Text style={styles.app_name}>Telegram</Text>
            <Telegram width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Telegram>
          </Pressable>


        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: CustomColors.neutralgrey_200,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20),
    borderRadius: moderateScale(20),
    backgroundColor: CustomColors.white
  },
  whole_container: {
    marginHorizontal: "5%",
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
  title: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: moderateScale(14),
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10)

  },
  desc: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18)
  },
  app:
    { borderRadius: moderateScale(10), backgroundColor: CustomColors.error_red, paddingHorizontal: horizontalScale(10), paddingVertical: verticalScale(10), width: "47%", flexDirection: "row", justifyContent: "space-around" },

  app_name: {
    color: CustomColors.white,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: moderateScale(18)

  },

  box: {
    borderWidth: 1, borderColor: CustomColors.new_theme_clr, borderRadius: moderateScale(8), width: "60%", height: verticalScale(50), alignItems: "center", justifyContent: "center"
  },
  round: {
    borderWidth: 1, borderColor: CustomColors.new_theme_clr, borderRadius: moderateScale(50), width: horizontalScale(50), height: verticalScale(50), alignItems: "center",
    justifyContent: "center"
  },
  referral: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.txt_18,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: moderateScale(22)
  },
  copycontainer:
    { flexDirection: "row", justifyContent: "space-around", marginBottom: verticalScale(10) }






});
