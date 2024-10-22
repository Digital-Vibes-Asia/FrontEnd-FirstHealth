import { StyleSheet, View, Image, Pressable } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import RightButton from "../../assets/icon/rightbutton.svg"
import LeftButton from "../../assets/icon/leftbutton.svg"
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';


export default function CarouselBox({ onPress1, onPress2, data }) {

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress1}>
        <LeftButton width={CustomDimensions.icon_width_40} height={CustomDimensions.icon_height_40}></LeftButton>
      </Pressable>
      {data.length > 0 && data.map((item, index) => {
        return (
          <View key={item?.id} style={[styles.round, { backgroundColor: item.selected ? CustomColors.new_theme_clr : CustomColors.white }]}>
          </View>
        )
      })
      }
      <Pressable onPress={onPress2}>
        <RightButton width={CustomDimensions.icon_width_40} height={CustomDimensions.icon_height_40}></RightButton>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   
    flexDirection: "row",
    alignItems: "center"
   
  },
  icon_style: { alignSelf: "center", },
  round: { width: horizontalScale(10), height: verticalScale(10), borderRadius: moderateScale(10), backgroundColor: CustomColors.theme_clr, marginHorizontal: horizontalScale(5), }


});
