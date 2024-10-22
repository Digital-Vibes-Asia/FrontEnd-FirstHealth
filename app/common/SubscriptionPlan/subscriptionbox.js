import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NextFhButton from '../Button/nextfhbutton';
import NextFillButton from '../Button/nextfillbutton';
import SigninButton from '../Button/signinbutton';
import SignupTitle from '../TittleBox/signuptitle';
import StepTxt from '../TittleBox/steptxt';
import PersonIcon from "../../assets/icon/personicon.svg"
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';
import InfoIcon from "../../assets/icon/planinfoicon.svg"
import CheckboxIcon from "../../assets/icon/checkboxicon.svg"
import FmButton from '../Button/fmbutton';



export default function SubscriptionBox({ onPress, item }) {
  console.log(JSON.stringify(item) + "...Item....")


  let buttonvalue = item?.eligible ? "Choose Subscription" : "Not eligible"

  return (

    <>
      <View style={{ marginBottom: verticalScale(10), }}>
        {item?.free_plan && <View style={{ marginBottom: verticalScale(10) }}>
          <Text style={styles.free_plan_heading}>Still can’t decide?</Text>
          <Text style={styles.free_plan_subhead}>Upgrade later for better peace of mind</Text>

        </View>
        }

        <Pressable style={[styles.container, styles.shadowProp, styles.elevation]} onPress={onPress}>
          <View style={{ alignItems: "center", flex: 1, }}>
            <View >
              <PersonIcon width={CustomDimensions.icon_width_15} height={CustomDimensions.icon_height_15}></PersonIcon>
            </View>
            <View style={styles.margintop_10}>
              <Text style={styles.plan_title}>{item?.plan}</Text>
            </View>
            {!item?.free_plan ?
              <View style={styles.margintop_10}>
                <Text style={[styles.small_start]}>Starting From</Text>
              </View>
              :
              <View style={styles.margintop_10}>
                <Text style={[styles.small_start]}>And pay direct later</Text>
              </View>
            }
            {item?.price != 0 ?
              <View style={styles.margintop_10}>
                <Text style={styles.amount_title}>{"RM"}{item?.price}<Text style={[styles.year_start]}>/ year</Text></Text>
              </View>
              :
              <View>
                <Text style={styles.amount_title}>{"RM"}{item?.price}</Text>
              </View>

            }
            {!item?.free_plan &&
              <View >
                <Text style={styles.txt_scratch}>Usual Price : RM{item?.usual_price}</Text>
              </View>
            }
          </View>
          {!item?.free_plan &&
            <>
              <View style={styles.key_container}>
                <View style={styles.key_line}></View>
                <Text style={styles.key_text}>KEY BENEFITS</Text>
                <View style={styles.key_line}></View>
              </View>

              <View style={styles.key_vertical_container}>
                <View style={{ flex: 1 / 2 }}>
                  <Text style={styles.emergency}>{item?.key_benefits?.emergency_calls}</Text>
                  <View style={styles.emergency_container}>
                    <Text style={styles.benefit_txt}>Emergency Trips
                    </Text>
                    <InfoIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></InfoIcon>

                  </View>
                </View>
                <View style={{ flex: 1 / 4, alignItems: "center", }}>
                  <View style={styles.key_vertical_line}></View>
                </View>

                <View style={{ flex: 1 / 2 }}>
                  <Text style={styles.emergency}>{item?.key_benefits?.clinic_calls}</Text>
                  <View style={styles.emergency_container}>
                    <Text style={styles.benefit_txt}>Non-emergency Trips  </Text>
                    <InfoIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></InfoIcon>
                  </View>


                </View>
              </View>
            </>
          }

          <View style={styles.key_container}>
            <View style={styles.key_line}></View>
            {!item?.free_plan ?
              <Text style={styles.key_text}>OTHER BENEFITS</Text>
              : <Text style={styles.key_text}>BENEFITS</Text>}
            <View style={styles.key_line}></View>
          </View>


          <View style={{ marginTop: verticalScale(10), marginBottom: verticalScale(10) }}>
            {
              item?.benefits.map((item, index) => {
                return <View style={styles.other_benefits} key={item.id}>
                  <CheckboxIcon width={CustomDimensions.icon_width_30} height={CustomDimensions.icon_height_30}></CheckboxIcon>
                  <Text style={styles.otherben_txt}>{item?.benefit_description}</Text>
                </View>
              })
            }
          </View>



          {!item?.free_plan ?
            <NextFillButton
              eligible={item?.eligible} value={buttonvalue} onPress={() => {
                if (item?.eligible) {
                  onPress(item)
                }
              }}></NextFillButton>
            : <FmButton value={"Continue with free membership"} onPress={() => {
              
              onPress(item)
            }}></FmButton>
          }

        </Pressable>
      </View>

    </>


  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.white,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: CustomColors.neutralgrey_200,
    flex: 1,
  },

  margintop_10: {
    marginTop: verticalScale(5)

  },

  shadowProp: {
    shadowColor: CustomColors.black,
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },

  elevation: {
    // elevation: 20,
    // shadowColor: CustomColors.black,
  },


  gap_20: {
    marginLeft: CustomDimensions.mar_20

  },
  title: {
    color: CustomColors.red,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.ComfortaaSemiBold,
  },
  plan_title: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.txt_22,
    fontFamily: CustomFonts.PoppinsMedium,
    lineHeight: verticalScale(26),
  },
  small_start: {
    color: CustomColors.neutral_500,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(14)


  },
  year_start: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.verylarge_title,
    fontFamily: CustomFonts.PoppinsRegular,
    // lineHeight: verticalScale(24),


  },
  txt_scratch: {
    color: CustomColors.error_red,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsRegular,
    textDecorationLine: "line-through",
    lineHeight: verticalScale(14)

  },
  amount_title: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.size_32,
    fontFamily: CustomFonts.PoppinsSemiBold,
    // lineHeight: verticalScale(38)

  },
  key_text: {
    color: CustomColors.neutral_500,
    fontSize: CustomFontSize.normal_12,
    fontFamily: CustomFonts.PoppinsSemiBold,
    marginHorizontal: horizontalScale(5),
    lineHeight: verticalScale(14),

  },
  key_container: {
    flexDirection: "row", alignItems: "center", marginTop: verticalScale(20),
  },
  key_line:
    { borderBottomColor: CustomColors.neutralgrey_200, borderBottomWidth: 1, flex: 1 },

  key_vertical_line:
  {
    borderLeftColor: CustomColors.bordercolour, borderLeftWidth: 1, height: "100%",
  },

  key_vertical_container: {
    marginTop: verticalScale(10), flexDirection: "row", alignContent: "center", height: "15%",
  },
  emergency_container: { flexDirection: "row", marginTop: verticalScale(5), alignSelf: "center", },

  emergency: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.large_title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    textAlign: "center",
    lineHeight: verticalScale(28)
  },
  benefit_txt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    textAlign: "center",
    lineHeight: verticalScale(18),
    marginRight: horizontalScale(5),

  },

  free_plan_heading: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.txt_22,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(26),
    textAlign: "center",
    marginTop: verticalScale(10)
  },
  free_plan_subhead: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(19),
    textAlign: "center",
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10)
  },

  otherben_txt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
    marginHorizontal: horizontalScale(10),
  },
  other_benefits:
    { flexDirection: "row", marginTop: verticalScale(10), alignItems: "center" },




  txtgap: { flexDirection: "row", alignContent: "center", marginTop: CustomDimensions.mar_5, }

});
