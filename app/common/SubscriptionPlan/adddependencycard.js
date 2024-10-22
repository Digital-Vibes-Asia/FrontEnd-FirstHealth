import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';
import DependantUser from "../../assets/icon/dependantavatar.svg"
import WhiteAdd from "../../assets/icon/whiteicon.svg"
import Minus from "../../assets/icon/minus.svg"
import PlusIcon from "../../assets/icon/plusicon.svg"



export default function AddDependancyCard({ members, onpress, data, membersData, onPress }) {

  console.log(JSON.stringify(members) + " Members...")


  return (
    <>

      {
        data.map((item) => {
          return <Pressable style={{ marginBottom: verticalScale(10) }} key={item.Id} onPress={() => {
            onpress(item)

          }}>
            <View style={{ borderWidth: moderateScale(1), borderColor: CustomColors.neutralgrey_200, borderRadius: moderateScale(8), paddingVertical: verticalScale(15), paddingHorizontal: horizontalScale(10) }}>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>

                {item.man_reg ?
                  <><View style={{ flexDirection: "row", height: "100%", alignItems: "center", }}>
                    <DependantUser width={CustomDimensions.icon_width_50} height={CustomDimensions.icon_height_50}></DependantUser>
                    <View style={{ alignItems: "center", marginLeft: horizontalScale(10) }}>
                      <Text style={styles.title}>{item?.name}</Text>
                    </View>
                  </View>
                  </> :
                  <View style={styles.detailcontainer}>
                    <DependantUser width={CustomDimensions.icon_width_50} height={CustomDimensions.icon_height_50}></DependantUser>

                    <View style={{ marginLeft: horizontalScale(10) }}>
                      {item.filled && !item.man_reg &&
                        <>
                          <View style={styles.txtcontainer}>
                            <Text style={styles.name}>{"Invite Sent"}</Text>
                          </View>
                          <View style={{ marginBottom: verticalScale(5) }}>
                            <Text style={styles.title}>{item?.name}</Text>
                          </View>
                        </>
                      }
                      {!item?.filled &&
                        <View>
                          <Text style={styles.title}>{"Add: "}{item?.type}</Text>
                          <Text style={styles.sub_title}>{"("}{item?.range}{")"}</Text>
                        </View>

                      }
                    </View>

                    <View>
                    </View>
                  </View>


                }



                <View>
                  {!item?.filled &&
                    <View style={styles.plusiconcontainer}>
                      <PlusIcon width={CustomDimensions.icon_width_25} height={CustomDimensions.icon_height_25}></PlusIcon>
                    </View>
                  }

                </View>
              </View>
            </View>
          </Pressable>
        })
      }


    </>


  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.light_green,
    paddingHorizontal: CustomDimensions.pad_10,
    paddingVertical: CustomDimensions.pad_10,
    borderRadius: CustomDimensions.brad_8,
    borderWidth: CustomDimensions.bw_1,
    borderColor: CustomColors.font_clr,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  name: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.txt_10,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(12),
    paddingHorizontal: horizontalScale(8),
    // paddingVertical:horizontalScale(1),

  },
  txtcontainer: {
    alignItems: "center",
    backgroundColor: CustomColors.soft_pink,
    borderRadius: moderateScale(32),
    maxWidth: horizontalScale(100),
    paddingVertical: verticalScale(5),
    // width:100,
    // paddingHorizontal:horizontalScale(10),
    // maxWidth: 100,


  },

  title: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(18),
    marginTop: verticalScale(5),
  },
  sub_title: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.txt_10,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(12),
    marginTop: verticalScale(2)
  },
  pricetxt: {
    color: CustomColors.new_theme_clr,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(19),
  },
  count: {
    color: CustomColors.txt,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(19)
  },


  otherben_txt: {
    color: CustomColors.oben_txt,
    fontSize: CustomFontSize.small,
    fontFamily: CustomFonts.PoppinsRegular,
    marginHorizontal: 10,
  },
  other_benefits:
    { flexDirection: "row", marginTop: 10, alignItems: "center" },

  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: CustomColors.greysmiley, alignItems: 'center', justifyContent: "center", marginRight: 10, },
  detailcontainer: { flexDirection: "row", justifyContent: "flex-start", },

  single_container: { flexDirection: 'row', paddingHorizontal: horizontalScale(5), borderRadius: moderateScale(5), alignSelf: 'flex-end', backgroundColor: CustomColors.add_clr, alignItems: "center", justifyContent: "center", paddingVertical: verticalScale(8), },
  plus_icon: { paddingHorizontal: horizontalScale(5), borderTopRightRadius: moderateScale(5), borderBottomRightRadius: moderateScale(5), alignItems: 'center', justifyContent: "center", paddingVertical: verticalScale(8), borderWidth: moderateScale(1), borderColor: CustomColors.neutralgrey_200 },
  minus_icon: { paddingHorizontal: horizontalScale(5), borderTopLeftRadius: moderateScale(5), borderBottomLeftRadius: moderateScale(5), justifyContent: "center", alignItems: "center", paddingVertical: verticalScale(8), borderWidth: moderateScale(1), borderColor: CustomColors.neutralgrey_200 },

  plusiconcontainer: { width: horizontalScale(40), height: verticalScale(40), borderRadius: moderateScale(40), borderWidth: moderateScale(1), borderColor: CustomColors.new_theme_clr, alignItems: "center", justifyContent: "center" }


});
