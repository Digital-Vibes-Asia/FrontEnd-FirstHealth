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

export default function CheckFilter({ value, desc, error, variable }) {
  const dispatch = useDispatch();
  const { activityPayload } = useSelector((state) => state?.operation);
  console.log(value, variable, "kdbadbcissdcdnci", activityPayload);
  return (
    <>
      <View style={{ margin: moderateScale(4) }}>
        <Pressable
          onPress={() => {
            //   toggle(1);
            if (activityPayload.filterBy.includes(value))
              dispatch(
                removeActivityPayload({
                  orderBy: activityPayload.orderBy,
                  filterBy: value,
                })
              );
            else
              dispatch(
                setActivityPayload({
                  // orderBy: activityPayload.orderBy,
                  filterBy: value,
                })
              );
          }}
        >
          <View
            style={[
              styles.container,
              {
                backgroundColor: activityPayload.filterBy?.includes(value)
                  ? CustomColors.new_theme_clr
                  : CustomColors.white,
                borderColor: activityPayload.filterBy?.includes(value)
                  ? CustomColors.new_theme_clr
                  : CustomColors.neutral_200,
              },
            ]}
          >
            {/* <GenderTick status={value} /> */}
            <View>
              <Text
                style={[
                  styles.txt,
                  {
                    color: activityPayload.filterBy?.includes(value)
                      ? CustomColors.white
                      : CustomColors.txt,
                  },
                ]}
              >
                {variable}
              </Text>
            </View>
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
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: moderateScale(1),
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
  },
  desctxt: {
    color: CustomColors.error_red,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
  },
});
