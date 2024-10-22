import {
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Text,
  Alert,
} from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/common/Metrics";
import DependantUser from "../../assets/icon/dependantavatar.svg";
import WhiteAdd from "../../assets/icon/whiteicon.svg";
import Minus from "../../assets/icon/minus.svg";
import PlusIcon from "../../assets/icon/plusicon.svg";
import { useSelector } from "react-redux";
import { useState } from "react";
import ExceedAlertDialog from "../Dialogs/exceedAlertDialog";

export default function PurchaseSlot({ onpress, membersData, totalCount }) {
  const [isShow, setShow] = useState(false);
  const slotsCount = useSelector((state) => state.operation?.slotsCount);

  const overAllCount = slotsCount + totalCount;
  const slotLimit = 10;

  const remianingSlot = slotLimit - overAllCount;

  return (
    <>
      <View style={{ paddingVertical: moderateScale(5) }}>
        <Text style={styles.txt}>
          Remaining slots :{" "}
          <Text style={{ fontFamily: CustomFonts.PoppinsSemiBold }}>
            {remianingSlot}
          </Text>
        </Text>
      </View>
      {membersData.map((item) => {
        return (
          <View style={{ marginBottom: verticalScale(10) }} key={item.id}>
            <View
              style={{
                borderWidth: moderateScale(1),
                borderColor:
                  item?.count == 0
                    ? CustomColors.neutralgrey_200
                    : CustomColors.new_theme_clr,
                borderRadius: moderateScale(8),
                paddingVertical: verticalScale(15),
                paddingHorizontal: horizontalScale(10),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.detailcontainer}>
                  <DependantUser
                    width={CustomDimensions.icon_width_50}
                    height={CustomDimensions.icon_height_50}
                  ></DependantUser>
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: horizontalScale(10),
                    }}
                  >
                    <View style={styles.txtcontainer}>
                      <Text style={styles.name}>{"Dependant"}</Text>
                    </View>
                    <View>
                      <Text style={styles.title}>
                        {"Add: "}
                        {item?.title}
                      </Text>
                      <Text style={styles.sub_title}>
                        {"("}
                        {item?.range_limit}
                        {")"}
                      </Text>
                    </View>
                  </View>
                  <View></View>
                </View>
                <View>
                  <View>
                    <View
                      style={{
                        alignSelf: "flex-end",
                        marginBottom: verticalScale(5),
                      }}
                    >
                      <Text style={styles.pricetxt}>
                        {"+RM"}
                        {item?.price}
                      </Text>
                    </View>
                    {item?.count == 0 ? (
                      <Pressable
                        style={styles.single_container}
                        onPress={() => {
                          overAllCount >= 10
                            ? setShow(true)
                            : [onpress("add", item)];
                        }}
                      >
                        <WhiteAdd
                          width={CustomDimensions.icon_width_20}
                          height={CustomDimensions.icon_height_20}
                        ></WhiteAdd>
                      </Pressable>
                    ) : (
                      <View style={{ flexDirection: "row" }}>
                        <Pressable
                          style={styles.minus_icon}
                          onPress={() => {
                            onpress("sub", item);
                          }}
                        >
                          <Minus
                            width={CustomDimensions.icon_width_20}
                            height={CustomDimensions.icon_height_20}
                          ></Minus>
                        </Pressable>
                        <View
                          style={{
                            width: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: moderateScale(1),
                            borderColor: CustomColors.neutralgrey_200,
                          }}
                        >
                          <Text style={styles.count}>{item?.count}</Text>
                        </View>
                        <Pressable
                          style={styles.plus_icon}
                          onPress={() => {
                            overAllCount >= 10
                              ? setShow(true)
                              : onpress("add", item);
                          }}
                        >
                          <PlusIcon
                            width={CustomDimensions.icon_width_20}
                            height={CustomDimensions.icon_height_20}
                          ></PlusIcon>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      })}

      <ExceedAlertDialog isShow={isShow} setShow={setShow} />

      {/* <View style={{ marginBottom: verticalScale(10) }}>
        <View style={{ borderWidth: moderateScale(1), borderColor: CustomColors.neutralgrey_200, borderRadius: moderateScale(8), paddingVertical: verticalScale(15), paddingHorizontal: horizontalScale(10) }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <View style={styles.detailcontainer}>
              <DependantUser width={CustomDimensions.icon_width_50} height={CustomDimensions.icon_height_50}></DependantUser>
              <View style={{ flexDirection: "column", marginLeft: horizontalScale(10) }}>
                <View style={styles.txtcontainer}>
                  <Text style={styles.name}>{"Dependant"}</Text>
                </View>
                <View>
                  <Text style={styles.title}>{"Add: Child"}</Text>
                  <Text style={styles.sub_title}>{"("}{"18-59 years old"}{")"}</Text>
                </View>
              </View>
              <View>
              </View>
            </View>
            <View>

              <View >
                <View style={{ alignSelf: "flex-end", marginBottom: verticalScale(5) }}>
                  <Text style={styles.pricetxt}>{"+RM"}{150}</Text>
                </View>
                {members?.child == 0 ?
                  <Pressable style={styles.single_container} onPress={() => [
                    onpress("add", "child")
                  ]}>
                    <WhiteAdd width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></WhiteAdd>
                  </Pressable>
                  :
                  <View style={{ flexDirection: 'row', }}>
                    <Pressable style={styles.minus_icon} onPress={() => {
                      onpress("sub", "child")

                    }}>
                      <Minus width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Minus>
                    </Pressable>
                    <View style={{ width: 30, alignItems: "center", justifyContent: "center", borderWidth: moderateScale(1), borderColor: CustomColors.neutralgrey_200 }}>
                      <Text style={styles.count}>{members?.child}</Text>
                    </View>
                    <Pressable style={styles.plus_icon} onPress={() => {
                      onpress("add", "child")
                    }}>
                      <PlusIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></PlusIcon>
                    </Pressable>
                  </View>}
              </View>

            </View>
          </View>
        </View>
      </View>




      <View style={{ marginBottom: verticalScale(10) }}>
        <View style={{ borderWidth: moderateScale(1), borderColor: CustomColors.neutralgrey_200, borderRadius: moderateScale(8), paddingVertical: verticalScale(15), paddingHorizontal: horizontalScale(10) }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <View style={styles.detailcontainer}>
              <DependantUser width={CustomDimensions.icon_width_50} height={CustomDimensions.icon_height_50}></DependantUser>
              <View style={{ flexDirection: "column", marginLeft: horizontalScale(10) }}>
                <View style={styles.txtcontainer}>
                  <Text style={styles.name}>{"Dependant"}</Text>
                </View>
                <View>
                  <Text style={styles.title}>{"Add: Adult"}</Text>
                  <Text style={styles.sub_title}>{"("}{"Older than 60 years old"}{")"}</Text>
                </View>
              </View>
              <View>
              </View>
            </View>
            <View>

              <View >
                <View style={{ alignSelf: "flex-end", marginBottom: verticalScale(5) }}>
                  <Text style={styles.pricetxt}>{"+RM"}{150}</Text>
                </View>
                {members?.adult == 0 ?
                  <Pressable style={styles.single_container} onPress={() => [
                    onpress("add", "adult")
                  ]}>
                    <WhiteAdd width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></WhiteAdd>
                  </Pressable>
                  :
                  <View style={{ flexDirection: 'row', }}>
                    <Pressable style={styles.minus_icon} onPress={() => {
                      onpress("sub", "adult")

                    }}>
                      <Minus width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Minus>
                    </Pressable>
                    <View style={{ width: 30, alignItems: "center", justifyContent: "center", borderWidth: moderateScale(1), borderColor: CustomColors.neutralgrey_200 }}>
                      <Text style={styles.count}>{members?.adult}</Text>
                    </View>
                    <Pressable style={styles.plus_icon} onPress={() => {
                      onpress("add", "adult")
                    }}>
                      <PlusIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></PlusIcon>
                    </Pressable>
                  </View>}
              </View>

            </View>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: verticalScale(10) }}>
        <View style={{ borderWidth: moderateScale(1), borderColor: CustomColors.neutralgrey_200, borderRadius: moderateScale(8), paddingVertical: verticalScale(15), paddingHorizontal: horizontalScale(10) }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <View style={styles.detailcontainer}>
              <DependantUser width={CustomDimensions.icon_width_50} height={CustomDimensions.icon_height_50}></DependantUser>
              <View style={{ flexDirection: "column", marginLeft: horizontalScale(10) }}>
                <View style={styles.txtcontainer}>
                  <Text style={styles.name}>{"Dependant"}</Text>
                </View>
                <View>
                  <Text style={styles.title}>{"Add: Senior Citizen"}</Text>
                  <Text style={styles.sub_title}>{"("}{"older than 60 years old"}{")"}</Text>
                </View>
              </View>
              <View>
              </View>
            </View>
            <View>

              <View >
                <View style={{ alignSelf: "flex-end", marginBottom: verticalScale(5) }}>
                  <Text style={styles.pricetxt}>{"+RM"}{250}</Text>
                </View>
                {members?.senior == 0 ?
                  <Pressable style={styles.single_container} onPress={() => [
                    onpress("add", "senior")
                  ]}>
                    <WhiteAdd width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></WhiteAdd>
                  </Pressable>
                  :
                  <View style={{ flexDirection: 'row', }}>
                    <Pressable style={styles.minus_icon} onPress={() => {
                      onpress("sub", "senior")

                    }}>
                      <Minus width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Minus>
                    </Pressable>
                    <View style={{ width: 30, alignItems: "center", justifyContent: "center", borderWidth: moderateScale(1), borderColor: CustomColors.neutralgrey_200 }}>
                      <Text style={styles.count}>{members?.senior}</Text>
                    </View>
                    <Pressable style={styles.plus_icon} onPress={() => {
                      onpress("add", "senior")
                    }}>
                      <PlusIcon width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></PlusIcon>
                    </Pressable>
                  </View>}
              </View>

            </View>
          </View>
        </View>
      </View> */}
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
    marginTop: verticalScale(2),
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
    lineHeight: verticalScale(19),
  },

  otherben_txt: {
    color: CustomColors.oben_txt,
    fontSize: CustomFontSize.small,
    fontFamily: CustomFonts.PoppinsRegular,
    marginHorizontal: 10,
  },
  other_benefits: { flexDirection: "row", marginTop: 10, alignItems: "center" },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: CustomColors.greysmiley,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  detailcontainer: { flexDirection: "row", justifyContent: "flex-start" },

  single_container: {
    flexDirection: "row",
    paddingHorizontal: horizontalScale(5),
    borderRadius: moderateScale(5),
    alignSelf: "flex-end",
    backgroundColor: CustomColors.add_clr,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(8),
  },
  plus_icon: {
    paddingHorizontal: horizontalScale(5),
    borderTopRightRadius: moderateScale(5),
    borderBottomRightRadius: moderateScale(5),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(8),
    borderWidth: moderateScale(1),
    borderColor: CustomColors.neutralgrey_200,
  },
  minus_icon: {
    paddingHorizontal: horizontalScale(5),
    borderTopLeftRadius: moderateScale(5),
    borderBottomLeftRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(8),
    borderWidth: moderateScale(1),
    borderColor: CustomColors.neutralgrey_200,
  },
  txt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
  },
});
