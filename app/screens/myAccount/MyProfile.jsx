import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileActionBar from "../../common/ActionBar/ProfileActionBar";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import { Divider } from "react-native-paper";
import FileText from "../../assets/icon/file-text.svg";
import Address from "../../assets/icon/address.svg";
import User from "../../assets/icon/User.svg";
import Menu from "../../assets/icon/menu.svg";
import Edit from "../../assets/icon/edit.svg";
import { useGetQuery } from "../../store/api";
import { UrlBase } from "../../utils/common/urlbase";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { BooleanObject, genderObject } from "../../utils/common/defaults";
import BackgorundWave from "../../assets/icon/backgroundwave.svg";
import { horizontalScale, verticalScale } from "../../utils/common/Metrics";
import { setUsername } from "../../store/value";
import { useDispatch } from "react-redux";
import { Skeleton } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import HeadSkeleton from "../../common/Skeleton/HeadSkeleton";
import EditSkeleton from "../../common/Skeleton/EditSkeleton";

const MyProfile = () => {
  const navigation = useNavigation();
  const setRedux = useDispatch();
  const [userData, setUserData] = useState();
  const [registerData, setRegisterData] = useState();
  const [subscriptionData, setSubsData] = useState();

  const {
    data: profileData,
    error,
    refetch,
    isFetching,
  } = useGetQuery(UrlBase.PROFILEVIEW);
  console.log(isFetching, "<-- get profiledata isLoading");

  // const userData = useMemo(() => {
  //   return profileData?.user;
  // }, [profileData]);

  // const registerData = useMemo(() => {
  //   return profileData?.registration;
  // }, [profileData]);

  // const subscriptionData = useMemo(() => {
  //   return profileData?.user_subscription;
  // }, [profileData]);

  useEffect(() => {
    setUserData(profileData?.user);
    setRegisterData(profileData?.registration);
    setSubsData(profileData?.user_subscription);
    setRedux(
      setUsername(
        `${profileData?.registration?.first_name} ${profileData?.registration?.last_name}`
      )
    );
  }, [profileData]);

  useEffect(() => {
    refetch();
  }, []);

  const RowView = ({ title, desc }) => {
    return (
      <>
        {!isFetching ? (
          <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{desc}</Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Skeleton
              style={[
                styles.title,
                {
                  opacity: 0.4,
                  marginVertical: verticalScale(4),
                  marginHorizontal: 5,
                },
              ]}
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={"45%"}
              height={verticalScale(12)}
            />
            <Skeleton
              style={[
                styles.desc,
                { opacity: 0.4, marginVertical: verticalScale(4) },
              ]}
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={"50%"}
              height={verticalScale(12)}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <>
      <ProfileActionBar
        txt={`${registerData?.first_name ?? ""} ${
          registerData?.last_name ?? ""
        }`}
        onPress={() => navigation.navigate("MyAccount")}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        bounces={false}
      >
        <View>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.header}>
                {isFetching ? (
                  <HeadSkeleton />
                ) : (
                  <>
                    <FileText
                      width={CustomDimensions.icon_width_20}
                      height={CustomDimensions.icon_height_20}
                    ></FileText>
                    <Text style={styles.HeadText}>Membership Details</Text>
                  </>
                )}
              </View>

              <RowView
                title={"Membership ID"}
                desc={
                  subscriptionData?.referral_no ??
                  profileData?.principl_user?.referral_no
                }
              />
              <RowView
                title={"Member Since"}
                desc={moment(subscriptionData?.start_date).format(
                  "DD MMM YYYY"
                )}
              />
              <RowView title={"E-mail"} desc={userData?.email} />
            </View>
            <Divider
              style={styles.divider}
              theme={{ colors: { primary: CustomColors.grey_bg } }}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.editContainer}>
                <View style={styles.header}>
                  {isFetching ? (
                    <HeadSkeleton />
                  ) : (
                    <>
                      <User
                        width={CustomDimensions.icon_width_20}
                        height={CustomDimensions.icon_height_20}
                      ></User>
                      <Text style={styles.HeadText}>Personal Information</Text>
                    </>
                  )}
                </View>
                <View style={{marginTop: verticalScale(32)}}>
                  <Pressable
                    style={[styles.header,{marginTop: 0}]}
                    onPress={() =>
                      navigation.navigate("step1", { isEdit: true })
                    }
                  >
                    {isFetching ? (
                      <>
                        <EditSkeleton />
                      </>
                    ) : (
                      <>
                        <Text style={styles.editText}>Edit</Text>
                        <Edit
                          width={CustomDimensions.icon_width_15}
                          height={CustomDimensions.icon_height_15}
                        ></Edit>
                      </>
                    )}
                  </Pressable>
                </View>
              </View>
              <RowView
                title={"Full Name"}
                desc={`${registerData?.first_name ?? ""} ${
                  registerData?.last_name ?? ""
                }`}
              />
              <RowView
                title={"Contact No."}
                desc={registerData?.phone_number}
              />
              <RowView
                title={"Date of Birth"}
                desc={moment(registerData?.dob).format("DD MMM YYYY")}
              />
              <RowView title={"Race"} desc={registerData?.race ?? ""} />
              <RowView
                title={"Gender"}
                desc={genderObject[registerData?.gender ?? "default"]}
              />
              <RowView
                title={"Nationality"}
                desc={registerData?.nationality ?? ""}
              />
            </View>
            <Divider
              style={styles.divider}
              theme={{ colors: { primary: CustomColors.grey_bg } }}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.editContainer}>
                <View style={styles.header}>
                  {isFetching ? (
                    <HeadSkeleton />
                  ) : (
                    <>
                      <Address
                        width={CustomDimensions.icon_width_20}
                        height={CustomDimensions.icon_height_20}
                      ></Address>
                      <Text style={styles.HeadText}>Address</Text>
                    </>
                  )}
                </View>
                <View style={{marginTop: verticalScale(32)}}>
                  <Pressable
                    style={[styles.header,{marginTop: 0}]}
                    onPress={() => navigation.navigate("step2")}
                  >
                    {isFetching ? (
                      <>
                        <EditSkeleton />
                      </>
                    ) : (
                      <>
                        <Text style={styles.editText}>Edit</Text>
                        <Edit
                          width={CustomDimensions.icon_width_15}
                          height={CustomDimensions.icon_height_15}
                        ></Edit>
                      </>
                    )}
                  </Pressable>
                </View>
              </View>
              <RowView
                title={"Full Address"}
                desc={`${registerData?.address ?? ""} ${
                  registerData?.address2 ? "," + registerData?.address2 : ""
                } ${registerData?.state} ${registerData?.city} ${
                  registerData?.postcode
                }`}
              />
            </View>
            <Divider
              style={styles.divider}
              theme={{ colors: { primary: CustomColors.grey_bg } }}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.editContainer}>
                <View style={styles.header}>
                  {isFetching ? (
                    <HeadSkeleton />
                  ) : (
                    <>
                      <Menu
                        width={CustomDimensions.icon_width_20}
                        height={CustomDimensions.icon_height_20}
                      ></Menu>
                      <Text style={styles.HeadText}>Medical Information</Text>
                    </>
                  )}
                </View>
                <View style={{marginTop: verticalScale(32)}}>
                  <Pressable
                    style={[styles.header,{marginTop: 0}]}
                    onPress={() => navigation.navigate("step3")}
                  >
                    {isFetching ? (
                      <>
                        <EditSkeleton />
                      </>
                    ) : (
                      <>
                        <Text style={styles.editText}>Edit</Text>
                        <Edit
                          width={CustomDimensions.icon_width_15}
                          height={CustomDimensions.icon_height_15}
                        ></Edit>
                      </>
                    )}
                  </Pressable>
                </View>
              </View>
              <RowView
                title={
                  "Does the dependant have any pre-existing heart conditions?"
                }
                desc={BooleanObject[registerData?.heart_problems ?? 0]}
              />
              <RowView
                title={"Do you have Diabetes?"}
                desc={BooleanObject[registerData?.diabetes ?? 0]}
              />
              <RowView
                title={"Are you allergic to any medication?"}
                desc={BooleanObject[registerData?.allergic ?? 0]}
              />
              <RowView
                title={"What medications are you allergic to?"}
                desc={registerData?.allergic_medication_list ?? "-"}
              />
            </View>
            {/* <Divider
            style={styles.divider}
            theme={{ colors: { primary: CustomColors.grey_bg } }}
          /> */}
          </View>
        </View>
      </ScrollView>
      {/* <View style={styles.footerContainer}>
        <Image
          source={require('../../assets/images/footer_v1.png')}
          style={styles.footerImage}
        />
        <Image
          source={require('../../assets/images/footer_v2.png')}
          style={styles.footerImage}
        />
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: verticalScale(8),
    opacity: 0.2,
    marginTop: verticalScale(12),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(32),
  },
  row: {
    // marginBottom:4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: verticalScale(12),
    gap: verticalScale(12),
  },
  HeadText: {
    fontFamily: CustomFonts.PoppinsMedium,
    // fontWeight: "500",
    fontSize: verticalScale(18),
    lineHeight: verticalScale(22),
    color: CustomColors.neutral_700,
    // lineHeight:22,
    marginLeft: horizontalScale(4),
    marginTop: verticalScale(4),
    gap: verticalScale(32),
  },
  title: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    // fontWeight: "500",
    fontSize: verticalScale(14),
    color: CustomColors.neutral_600,
    // width: 'fit-content',
    // maxWidth: "75%",
    lineHeight: verticalScale(18),
  },
  desc: {
    fontFamily: CustomFonts.PoppinsRegular,
    // fontWeight: "400",
    fontSize: verticalScale(14),
    color: CustomColors.neutral_600,
    maxWidth: "60%",
    textAlign: "right",
    alignSelf: "flex-end",
  },
  footerContainer: {
    position: "relatve",
    // bottom: 0,
  },
  footerImage: {
    width: CustomDimensions.screenWidth,
  },
  editContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: verticalScale(8),
  },
  editText: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    color: CustomColors.new_theme_clr,
    marginRight: horizontalScale(4),
    marginTop: verticalScale(8),
  },
});

export default MyProfile;
