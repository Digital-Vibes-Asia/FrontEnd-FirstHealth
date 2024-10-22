import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from '../../utils/common/CustomStyles';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../utils/common/Metrics';
import BackButton from '../../assets/icon/backbutton.svg';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import Route from "../../assets/icon/route.svg"


export default function RouteActionBar({ onPress, txt, txt2 }) {


  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 2 }}
        colors={[CustomColors.new_theme_clr, CustomColors.theme_clr]}
        style={[styles.container]}>
        <Pressable style={{ marginHorizontal: 20 }} onPress={onPress}>
          <Route
            width={CustomDimensions.icon_width_30}
            height={CustomDimensions.icon_height_30}></Route>
        </Pressable>
        <View>
          <Text style={styles.ttiletxt}>{"ETA : "}{txt}</Text>
          <Text style={styles.ttiletxt2}>{txt2}</Text>
        </View>
      </LinearGradient>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.new_theme_clr,
    paddingVertical: verticalScale(15),
    // height: 100,
    borderWidth: moderateScale(1),
    // borderColor: CustomColors.bordercolour,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // shadowProp: {
  //   shadowColor: CustomColors.black,
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 3,
  // },

  // elevation: {
  //   elevation: 20,
  //   shadowColor: CustomColors.black,
  // },

  ttiletxt: {
    color: CustomColors.white,
    fontSize: CustomFontSize.txt_18,
    fontFamily: CustomFonts.PoppinsMedium,
    lineHeight: verticalScale(22),
    marginBottom: verticalScale(5),
  },
  ttiletxt2: {
    color: CustomColors.white,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(14)
  },
});
