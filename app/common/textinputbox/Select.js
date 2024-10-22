import { TextInput, StyleSheet, View, Text, Pressable } from "react-native";
import {
  CustomColors,
  CustomFontSize,
  CustomFonts,
  CustomDimensions,
} from "../../utils/common/CustomStyles";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/common/Metrics";
import GenderTick from "../AlertBox/gendertick";
import { useDispatch, useSelector } from "react-redux";
import { removeActivityPayload, setActivityPayload } from "../../store/value";

export default function Select({ value, desc, error, variable,onPress,isSelected }) {
  
  return (
    <>
      <View>
        
        <Pressable
          onPress={onPress}
        >
          <View
            style={[
              styles.container,
              {
                backgroundColor: isSelected
                  ? CustomColors.new_theme_clr
                  : CustomColors.white,
                borderColor: isSelected
                  ? CustomColors.new_theme_clr
                  : CustomColors.neutral_200,
              },
            ]}
          >
              <Text
                style={[
                  styles.txt,
                  {
                    color: isSelected
                      ? CustomColors.white
                      : CustomColors.txt,
                  },
                ]}
              >
                {variable}
              </Text>
          </View>
        </Pressable>
        {error && <Text style={[styles.desctxt]}>{desc}</Text>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(8),
    // paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    margin:verticalScale(4),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: moderateScale(1),
columnGap: horizontalScale(16)
  },
  titletxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    marginRight: verticalScale(20),
  },
  txt: {
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    width: "100%"
  },
  desctxt: {
    color: CustomColors.error_red,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
  },
});
