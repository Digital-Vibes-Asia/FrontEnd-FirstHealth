import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RightArrow from "../../assets/icon/rightarrow2.svg"
import { verticalScale, moderateScale, horizontalScale } from '../../utils/common/Metrics';

export default function NextFillButton({ onPress, value, eligible,adjustable }) {
  const styleObj = adjustable ? {
    marginHorizontal: 0,
    marginVertical: verticalScale(16)
  } : {}
  return (
    
    <View style={[styles.whole_container, {...styleObj}]}>
      <Pressable
        style={[styles.container, { paddingVertical: eligible ? verticalScale(8) : verticalScale(12) ,backgroundColor: eligible ? CustomColors.new_theme_clr : CustomColors.neutral_100 }]}
        android_ripple={styles.ripple_colour}
        onPress={onPress}>
        <Text style={[styles.button,{  color: eligible ? CustomColors.white : CustomColors.neutral_400,}]}>{value}</Text>
       
          <View style={{ marginLeft: verticalScale(5)}}>
          {eligible &&
            <RightArrow width={CustomDimensions.icon_height_30} height={CustomDimensions.icon_height_30} ></RightArrow>
          }
          </View>
        
      </Pressable>

     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: CustomColors.new_theme_clr,
    // borderColor: CustomColors.theme_clr,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    // paddingVertical: verticalScale(10),
    // height:verticalScale(50),
    borderRadius: moderateScale(32),

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },

  whole_container: {
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(20),
  },

  button: {
  
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(19),

    // alignSelf: 'center',
    // textAlign:"center",
  },
});
