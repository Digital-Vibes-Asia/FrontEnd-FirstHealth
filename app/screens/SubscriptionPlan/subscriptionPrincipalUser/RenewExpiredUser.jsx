import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
  CustomFontSize,
} from "../../../utils/common/CustomStyles";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utils/common/Metrics";
import BackButton from "../../../assets/icon/backbutton.svg";
import UserIcon from "../../../assets/icon/UserAvatar.svg";
import AlertIcon from "../../../assets/icon/cautionIcon.svg";

import { useNavigation } from "@react-navigation/native";
import NextFillButton from "../../../common/Button/nextfillbutton";
import TitleContain from "../../../common/textbox/TitleContain";
import RowView from "../../../common/textbox/RowText";
import { useGetQuery, usePostMutation } from "../../../store/api";
import { UrlBase } from "../../../utils/common/urlbase";
import { useEffect } from "react";

const RenewExpiredUser = ({route}) => {
  const navigation = useNavigation();

  const [dispatch, { data, error }] = usePostMutation();


  console.log(data,'data of subs')

  useEffect(()=> {
    dispatch({
      data: {
        dependent_id: route.params?.id
      },
      url: UrlBase.GETDEPUSERPLAN
    })
  },[route.params?.id])

  const ActionBar = ({ txt, onPress, subText }) => {
    return (
      <>
        <View style={styles.mainContain}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 2 }}
            colors={[CustomColors.new_theme_clr, CustomColors.theme_clr]}
            style={[styles.container, { height: verticalScale(330) }]}
          ></LinearGradient>
        </View>
        <View
          style={{
            marginHorizontal: horizontalScale(20),
            marginVertical: verticalScale(20),
          }}
        >
          <Pressable onPress={onPress}>
            <BackButton
              width={CustomDimensions.icon_width_50}
              height={CustomDimensions.icon_height_50}
            ></BackButton>
          </Pressable>
          <View style={styles.headContainer}>
            <View>
              <Text style={styles.ttiletxt}>{txt}</Text>
              <Text style={styles.descText}>{subText}</Text>
            </View>
            <UserIcon
              width={CustomDimensions.icon_width_40}
              height={CustomDimensions.icon_height_40}
            />
          </View>
        </View>
      </>
    );
  };

 

  return (
    <>
      <ScrollView>
        <ActionBar
          txt={"Hello"}
          subText={"Adult Membership"}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.cardMain}>
          <View style={styles.card}>
            <AlertIcon />
            <Text style={styles.subText}>Subscription expired</Text>
            <Text style={styles.subsContent}>
              Your subscription has expired. For continued access to benefits
              for your dependants, please renew your plan or contact our support
              center for more information.
            </Text>
            <View style={{ width: "100%" }}>
              <NextFillButton
               onPress={()=> navigation.navigate("MemReview")}
                value={"Renew Subscription"}
                eligible={true}
                adjustable={true}
              />
            </View>
          </View>
        </View>
        <View style={[styles.emptView, { marginTop: verticalScale(20) }]} />
        <View style={{ gap: verticalScale(12) }}>
          <TitleContain subTitle={"Dependant"} isEditable={true} />
          <View style={{ marginHorizontal: horizontalScale(8) }}>
            <RowView title={"Membership ID"} desc={data?.referral_no ?? "-"} />
            <RowView title={"Membership Type"} desc={data?.subscription_details?.plan} />
            <RowView title={"Member Since"} desc={data?.user_subscription?.start_date} />
            <RowView title={"Full Name"} desc={data?.user?.name} />
            <RowView title={"E-mail"} desc={data?.user?.email} />
            <RowView title={"Date of Birth"} desc={data?.registration?.dob} />
          </View>
        </View>
        <View style={[styles.emptView, { marginTop: verticalScale(20) }]} />
        <View style={{ gap: verticalScale(12) }}>
          <TitleContain subTitle={"Remove Dependant"} isEditable={false} />
          <View style={{ marginHorizontal: horizontalScale(8) }}>
            <Text style={styles.descRemove}>
              Removing this dependant will forfeit all associated benefits and
              any payments made for this slot. You will need to purchase a new
              dependant slot to add another dependant in the future.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContain: {
    ...StyleSheet.absoluteFillObject, // Make this view fill the container
    backgroundColor: "white",
    position: "absolute",
  },
  
  descRemove:{
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(14),
    lineHeight: verticalScale(18)
  },
  container: {
    backgroundColor: CustomColors.new_theme_clr,
    borderWidth: moderateScale(1),
    flexDirection: "row",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  emptView: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 4,
    width: "100%",
    borderColor: CustomColors.neutral_100,
  },
  cardMain: {
    width: "100%",
    alignItems: "center",
    // paddingTop: 40,
  },
  card: {
    width: horizontalScale(328),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: CustomColors.border_color,
    backgroundColor: CustomColors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Offset
    shadowOpacity: 0.1, // Opacity
    shadowRadius: 8, // Blur radius
    // Android shadow properties
    elevation: 4, // Elevation level (can be adjusted)l
    paddingVertical: verticalScale(32),
    paddingHorizontal: horizontalScale(16),
    alignItems: "center",
    justifyContent: "center",
    gap: verticalScale(16),
  },

  headContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(8),
    alignItems: "center",
    marginTop: verticalScale(18),
  },
  subText: {
    fontFamily: CustomFonts.PoppinsMedium,
    fontSize: CustomFontSize.txt_18,
    color: CustomColors.neutral_700,
    // paddingVertical: verticalScale(15),
    lineHeight: verticalScale(22),
  },
  ttiletxt: {
    color: CustomColors.white,
    fontSize: verticalScale(18),
    fontFamily: CustomFonts.PoppinsMedium,
    lineHeight: verticalScale(22),
  },
  subsContent: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
    lineHeight: verticalScale(18),
  },
  descText: {
    color: CustomColors.white,
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(14),
    lineHeight: verticalScale(18),
  },
});

export default RenewExpiredUser;
