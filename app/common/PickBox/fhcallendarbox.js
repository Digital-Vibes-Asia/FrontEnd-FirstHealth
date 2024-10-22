import { TextInput, StyleSheet, View, Text, Pressable } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';

export default function FhCallendarBox({ hint, onPress, value, title, desc, error, madatory }) {
  let date = value != "" ? moment(value).format("DD-MM-YYYY") : hint


  return (
    <>
      <View style={{ marginBottom: verticalScale(10) }}>
        <Text style={styles.titletxt}>{title} {madatory && <Text style={[styles.titletxt, { color: CustomColors.error_red }]}>*</Text>}</Text>
        <Pressable style={styles.container} onPress={onPress}>
          <Text
            style={[styles.textinput, { color: value != "" ? CustomColors.txt : CustomColors.bordercolour }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{date}</Text>
          <AntDesign
            name="calendar"
            size={CustomDimensions.icon_20}
            color={CustomColors.font_clr}></AntDesign>
        </Pressable>
        {error &&
          <Text style={[styles.desctxt, { color: error ? CustomColors.red : CustomColors.lighttheme }]}>{desc}</Text>
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderColor: CustomColors.neutral_200,
    color: CustomColors.txt,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    // width: "80%"

  },

  container: {
    borderWidth: moderateScale(1),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(8),
    borderColor: CustomColors.neutral_200,
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,

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
  }

});
