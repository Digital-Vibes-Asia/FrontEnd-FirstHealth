import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';
import Down from "../../assets/icon/downicon2.svg"
import Up from "../../assets/icon/upicon.svg"



export default function FAQ({ onPress, item }) {
  console.log(item + "  Item....")


  const [hide, sethide] = useState(true)


  return (
    <>
      <View style={{ marginBottom: verticalScale(10) }}>
        <View style={[styles.container,{ borderColor: hide ? CustomColors.neutral_200 : CustomColors.new_theme_clr, backgroundColor: hide ? CustomColors.white : CustomColors.grey_bg} ]} >
          <View style={styles.question_container}>
            <Text style={[styles.title]}>{item?.question}</Text>
            <Pressable style={{}} onPress={() => {
              sethide(!hide)
            }}>
              {hide ?
                <Down width={CustomDimensions.icon_width_15} height={CustomDimensions.icon_height_15}></Down> : <Up width={CustomDimensions.icon_width_15} height={CustomDimensions.icon_height_15}></Up>
              }
            </Pressable>
          </View>
          {!hide &&
            <View style={{ marginVertical: verticalScale(5) }}>
              <Text style={styles.ansr}>{item?.answer}</Text>
            </View>
          }
        </View>


      </View>

    </>


  );

}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: CustomColors.light_green,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(20),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
   

  },
  question_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },


  title: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(18),
    width: "90%",

  },

  ansr: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18)

  },


});
