import { TextInput, StyleSheet, View, Text } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';
import DownButton from "../../assets/icon/downarrow.svg"

export default function WhDoubleDD({ hint, onChangeText, value, hint2, onChangeText2, value2, }) {

 

  let dd1 =  value ? value != "" ? value : hint : hint
  let dd2 = value2 ? value2 != "" ? value2 : hint2 : hint2



  return (
    <>
      <View style={styles.whole_container}>
        <View style={styles.single_container}>
          <Text
            style={[styles.textinput, { color: value ? CustomColors.txt : CustomColors.neutral_200, }]}
            numberOfLines={1}
           
            ellipsizeMode="tail"
            onChangeText={onChangeText}>{dd1}</Text>
          <View style={{ marginRight: horizontalScale(10) }}>
            <DownButton width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></DownButton>
          </View>
        </View>
        <View style={[styles.single_container, { marginLeft: verticalScale(10) }]}>
          <Text
            style={[styles.textinput, { color: value ? CustomColors.txt : CustomColors.neutral_200, }]}
            numberOfLines={1}
            ellipsizeMode="tail"
            onChangeText={onChangeText}>{dd2}</Text>
          <View style={{ marginRight: horizontalScale(10) }}>
            <DownButton width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></DownButton>
          </View>

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textinput: {

    paddingLeft: horizontalScale(20),
    paddingRight: horizontalScale(10),
    paddingVertical: verticalScale(10),
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    width: "80%",

  },
  titletxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    marginBottom: verticalScale(5),
    lineHeight: verticalScale(18),

  },


  desctxt: {
    color: CustomColors.error_red,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
  },
  whole_container:
    { marginBottom: verticalScale(10), flexDirection: "row", justifyContent: "space-between" },
  single_container: {
    flex: 1,
    borderColor: CustomColors.neutral_200,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  }



});
