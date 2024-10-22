import { TextInput, StyleSheet, View, Text, Pressable } from 'react-native';
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';
import GenderTick from '../AlertBox/gendertick';

export default function FilterPick({ value, title, desc, error, madatory, value2, toggle, variable, variable2 }) {
  return (
    <>
      <View style={styles.chkContainer}>
        <Pressable  onPress={() => {
          toggle(1)
        }}>
          <View style={[styles.container, {
            backgroundColor: value ? CustomColors.new_theme_clr : CustomColors.white,
            borderColor: value ? CustomColors.new_theme_clr : CustomColors.neutral_200,
          }]}>
            <GenderTick status={value}></GenderTick>
            <View >
              <Text style={[styles.txt, {
                color: value ? CustomColors.white : CustomColors.txt,
              }]}>{variable}</Text>
            </View>
          </View>
        </Pressable>
        <Pressable  onPress={() => {
          toggle(2)
        }}>
          <View style={[styles.container, {

            backgroundColor: value2 ? CustomColors.new_theme_clr : CustomColors.white,
            borderColor: value2 ? CustomColors.new_theme_clr : CustomColors.neutral_200,

          }]}>
            <GenderTick status={value2}></GenderTick>
            <View>
              <Text style={[styles.txt, {
                color: value2 ? CustomColors.white : CustomColors.txt,
              }]}>{variable2}</Text>
            </View>
          </View>
        </Pressable>
        {error &&
          <Text style={[styles.desctxt]}>{desc}</Text>
        }
      </View>

    </>
  );
}

const styles = StyleSheet.create({
    chkContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
  container: {
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(10),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: moderateScale(1),
  },
  titletxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    marginRight:verticalScale(20)
  },
  txt: {
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8)
  },
  desctxt: {
    color: CustomColors.error_red,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
  },
});
