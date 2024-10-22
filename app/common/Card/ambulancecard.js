import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/common/Metrics';
import { CustomColors, CustomFonts, CustomFontSize, CustomDimensions } from '../../utils/common/CustomStyles';
const { width, height } = Dimensions.get('window');
import Play from "../../assets/icon/play.svg"
import Scheduled from "../../assets/icon/scheduled.svg"
import Location from "../../assets/icon/location.svg"
import CallHotlineButton from '../Button/callhotline';
import RemoveButton from '../Button/removeButton';

const AmbulanceCard = ({ headText, subHead, desc, icon, txt, txt2, emergency, cancel }) => {

  let status = !emergency ? "SCHEDULED" : "DEPARTED"

  return (
    <View style={styles.container}>
      {!emergency ?
        <View style={styles.dispContainer}>
          <View style={{ width: 60, height: 60, borderRadius: 60, backgroundColor: CustomColors.soft_pink, justifyContent: "center", alignItems: "center" }}>
            <Scheduled
              width={CustomDimensions.icon_width_20}
              height={CustomDimensions.icon_height_20}></Scheduled>
          </View>

          <View style={{ marginHorizontal: horizontalScale(10), }}>

            <Text style={styles.ttiletxt2}>{"Scheduled ambulance"}</Text>
          </View>
        </View>
        :
        <View style={styles.dispContainer}>
          <View style={{ width: 60, height: 60, borderRadius: 60, backgroundColor: CustomColors.border_color }}>
          </View>
          <View style={{ marginHorizontal: horizontalScale(10), }}>
            <Text style={styles.ttiletxt}>{txt}</Text>
            <Text style={styles.ttiletxt2}>{txt2}</Text>
          </View>
        </View>
      }
      {true &&
        <View style={styles.playContainer}>
          <Play
            width={CustomDimensions.icon_width_20}
            height={CustomDimensions.icon_height_20}></Play>
          <View style={{ marginHorizontal: horizontalScale(10), }}>
            <Text style={styles.departedtxt}>{status}{": "}{"10:00 AM"}</Text>
            {emergency ?
              <Text style={styles.ttiletxt}>{"Hospital Sultan Aminah Syah 3"}</Text>
              :
              <Text style={styles.ttiletxt}>{"27 January 2024"}</Text>
            }
          </View>
        </View>
      }
      <View style={{ width: horizontalScale(20), alignItems: "center", marginBottom: verticalScale(2) }}>
        <View style={styles.parentcontainer}>
          <View style={styles.childcontainer}>
          </View>
        </View>
      </View>
      <View style={{ width: horizontalScale(20), alignItems: "center", marginBottom: verticalScale(2) }}>
        <View style={styles.parentcontainer}>
          <View style={styles.childcontainer}>
          </View>
        </View>
      </View>
      <View style={{ width: horizontalScale(20), alignItems: "center", marginBottom: verticalScale(8) }}>
        <View style={styles.parentcontainer}>
          <View style={styles.childcontainer}>
          </View>
        </View>
      </View>


      <View style={styles.destinyContainer}>
        <View style={{ alignItems: "center" }}>
          <Location
            width={CustomDimensions.icon_width_20}
            height={CustomDimensions.icon_height_20}></Location>
        </View>

        <View style={{ marginHorizontal: horizontalScale(10), }}>
          <Text style={styles.departedtxt}>{"DESTINATION"}</Text>
          <Text style={styles.ttiletxt2}>{"18 Jalan Ara SD 7/3e"}</Text>
          <Text style={styles.ttiletxt}>{"Bandar Sri Damansara"}</Text>
          <Text style={styles.ttiletxt}>{"52200 Petaling Jaya, Selangor"}</Text>
        </View>
      </View>
      {emergency ?
        <View style={{ marginTop: verticalScale(20) }}>
          <CallHotlineButton value={"Call Hotline"}></CallHotlineButton>
        </View>
        :
        <View style={{ marginTop: verticalScale(20) }}>
          <RemoveButton value={"Cancel Ambulance"} screen={"dui"} onPress={cancel}></RemoveButton>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.grey_bg,
    width: width - verticalScale(40),
    borderRadius: horizontalScale(8),
    borderWidth: verticalScale(1),
    borderColor: CustomColors.bordercolour,
    padding: verticalScale(12),

  },
  ttiletxt: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(14),
    marginBottom: verticalScale(1),
  },
  ttiletxt2: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.txt_18,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(20)
  },
  dispContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  playContainer: {
    flexDirection: "row",
    marginTop: verticalScale(20),
  },
  destinyContainer: {
    flexDirection: "row",

  },
  departedtxt: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(14),
    marginBottom: verticalScale(1),
  },
  header: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontSize: verticalScale(14),
    lineHeight: verticalScale(18),
    color: CustomColors.neutral_700,
  },
  subtext: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(14),
    color: CustomColors.neutral_600,
    lineHeight: verticalScale(18),
  },
  description: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(10),
    lineHeight: verticalScale(12),
  },
  textContainer: {
    gap: verticalScale(2),
  },
  parentcontainer: { width: 5, height: 5, borderRadius: 5, backgroundColor: CustomColors.neutral_300, justifyContent: "center", alignItems: "center", },
  childcontainer: { width: 1, height: 1, borderRadius: 1, backgroundColor: CustomColors.white }
});

export default AmbulanceCard;
