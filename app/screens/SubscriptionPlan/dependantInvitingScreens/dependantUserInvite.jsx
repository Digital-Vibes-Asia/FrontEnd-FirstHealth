import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
import RightArrow from "../../../assets/icon/rightArrow4.svg";
import UserIcon from "../../../assets/icon/User.svg";
import ExpandButton from "../../../common/Button/expandButton";
import RemoveButton from "../../../common/Button/removeButton";
import RemoveDependantDialog from "../../../common/Dialogs/removeDependantDialog";
import { useEffect, useMemo, useState } from "react";
import AlertIcon from "../../../assets/icon/cautionIcon.svg";
import InviteRejected from "../../../common/CommonSlots/inviteRejectedPara";
import ActionBoxDependent from "../../../common/ActionBoxDependent/ActionBoxDependent";
import ProgressBox from "../../../common/ProgressBox/progressBox";
import InviteSent from "../../../common/CommonSlots/inviteSentPara";
import UserCancelIcon from "../../../assets/icon/userXiconSmall.svg";
import EditIcon from "../../../assets/icon/editIcon2.svg";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setActivityPayload } from "../../../store/value";
import TitleContain from "../../../common/textbox/TitleContain";
import NextFillButton from "../../../common/Button/nextfillbutton";

export default function DependantUserInvite() {
  const [isExpand, setExpand] = useState(false);
  const depenDetails = useSelector((state) => state.operation.depenUserDetails);

  const [isShow, setShow] = useState({
    isOn: false,
    dependent_id: null,
  });

  const navigation = useNavigation();

  const data = useMemo(() => {
    return depenDetails.data;
  }, [depenDetails]);

  const referralNo = useMemo(() => {
    return depenDetails.referralNo;
  }, [depenDetails]);

  const date = data?.dob;
  const formattedDOB = moment(date).format("DD MMMM YYYY");

  const startDate = data?.start_date;
  const memStartDate = moment(startDate).format("DD MMMM YYYY");

  const name = data?.name;

  const email = data?.email ? data?.email : data?.to_mail;

  const plan = data?.subscription_master?.plan;

  const RowView = ({ title, desc }) => {
    return (
      <>
        <View style={styles.subsDetails}>
          <Text style={styles.titleLft}>{title}</Text>
          <Text style={styles.titleRht}>{desc}</Text>
        </View>
      </>
    );
  };

  const setRedux = useDispatch();

  const handleActivity = () => {
    setRedux(setActivityPayload({ filterBy: data?.user_id }));
    navigation.navigate("main", {
      screen: "MyActivity",
    });
  };

  function MembershipDetails({ status }) {
    return (
      <View style={styles.membDetails}>
        <View
          style={[styles.depenContent, { paddingBottom: verticalScale(10) }]}
        >
          <TitleContain
            subTitle={"Dependant Information"}
            isEditable={status == "manualReg"}
            onPress={() =>
              navigation.navigate("mr", {
                id: data?.reg_id,
                type: data?.type_dependant,
              })
            }
          />
        </View>
        <View style={{ paddingHorizontal: moderateScale(10) }}>
          <RowView title={"Membership ID"} desc={referralNo} />
          <RowView
            title={"Membership Type"}
            desc={data?.reg_id ? data?.type_dependant : plan}
          />
          <RowView title={"Member Since"} desc={memStartDate} />
          <RowView title={"Full Name"} desc={name} />
          <RowView title={"E-mail"} desc={email} />
          {isExpand ? (
            <View>
              <RowView title={"Contact No."} desc={data?.phone_number} />
              <RowView title={"Race"} desc={data?.race} />
              <RowView title={"Gender"} desc={data?.gender} />
              <RowView title={"Nationality"} desc={data?.nationality} />
              {data?.address ? (
                <RowView title={"Address"} desc={data?.address} />
              ) : null}
              {data?.city ? <RowView title={"City"} desc={data?.city} /> : null}
              {data?.state ? (
                <RowView title={"State"} desc={data?.state} />
              ) : null}
              {data?.country ? (
                <RowView title={"Country"} desc={data?.country} />
              ) : null}
              {data?.postcode ? (
                <RowView title={"postcode"} desc={data?.postcode} />
              ) : null}
              <RowView
                title={
                  "Does the dependant have any pre-existing heart conditions?"
                }
                desc={data?.heart_problems ? "Yes" : "No"}
              />
              <RowView
                title={"Do you have diabetes?"}
                desc={data?.diabetes ? "Yes" : "No"}
              />
              <RowView
                title={"Are you allergic to any medication?"}
                desc={data?.allergic ? "Yes" : "No"}
              />
              <RowView
                title={"What medications are you allergic to?"}
                desc={
                  data?.allergic_medication_list
                    ? data?.allergic_medication_list
                    : "-"
                }
              />
            </View>
          ) : null}

          <ExpandButton
            value={isExpand ? "Collapse" : "Expand"}
            expand={isExpand}
            onPress={() => setExpand(!isExpand)}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: CustomColors.grey_bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        bounces={false}
      >
        {data?.is_removed ? (
          <View>
            <InviteRejected details={data} referralNo={referralNo} />
          </View>
        ) : data?.is_plan_expired || data?.reg_id || data?.is_accepted === 1 ? (
          <View
            style={{ alignItems: "center", marginBottom: verticalScale(20) }}
          >
            <ActionBoxDependent
              txt={name ? name : email}
              planName={data?.reg_id ? data?.type_dependant : plan}
              refCode={referralNo}
              screen={
                data?.is_plan_expired
                  ? "expired"
                  : data?.reg_id
                  ? "manualRegistered"
                  : "dependantUserInvite"
              }
              status={data?.is_accepted === 1 && "inviteAccepted"}
              contentHeight={moderateScale(330)}
            ></ActionBoxDependent>
            {data?.is_plan_expired ? (
              <View
                style={[styles.cardMain, { paddingBottom: verticalScale(25) }]}
              >
                <View
                  style={{
                    width: "100%",
                    paddingHorizontal: moderateScale(16),
                  }}
                >
                  <View style={styles.card}>
                    <AlertIcon />
                    <Text style={styles.subsTxt}>Subscription expired</Text>
                    <Text style={styles.subsContent}>
                      Your subscription has expired. For continued access to
                      benefits for your dependants, please renew your plan or
                      <Text style={{ color: CustomColors.new_theme_clr }}>
                        {" "}
                        contact our support center{" "}
                      </Text>
                      for more information.
                    </Text>
                    <View style={{ width: "100%" }}>
                      <NextFillButton
                        onPress={() => navigation.navigate("MemReview")}
                        value={"Renew Subscription"}
                        eligible={true}
                        adjustable={true}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <>
                <View style={{ width: "95%", alignItems: "center" }}>
                  <View style={{ paddingTop: moderateScale(10) }}>
                    <ProgressBox data={data} />
                  </View>
                  <View
                    style={{ padding: moderateScale(20), alignItems: "center" }}
                  >
                    <Pressable
                      onPress={() => {
                        handleActivity();
                      }}
                      style={styles.actBtn}
                    >
                      <Text style={styles.actBtnTxt}>View activity log</Text>
                      <RightArrow />
                    </Pressable>
                  </View>
                </View>
              </>
            )}
            <View style={styles.emptView} />

            <MembershipDetails
              status={data?.reg_id ? "manualReg" : "inviteAccepted"}
            />
            <View style={styles.emptView} />
            <View style={[styles.bottomContent, { width: "100%" }]}>
              <UserIcon
                width={CustomDimensions.icon_width_20}
                height={CustomDimensions.icon_height_20}
              />
              <Text style={styles.listHeadTitle}> Remove Dependant</Text>
            </View>
            <Text
              style={[
                styles.subsContent,
                {
                  padding: moderateScale(20),
                  paddingTop: verticalScale(10),
                },
              ]}
            >
              Removing this dependant will forfeit all associated benefits and
              any payments made for this slot. You will need to purchase a new
              dependant slot to add another dependant in the future.
            </Text>
            <View style={{ width: "100%" }}>
              <RemoveButton
                value={"Remove Dependant"}
                onPress={() =>
                  setShow({
                    isOn: true,
                    dependent_id: depenDetails?.data?.user_id,
                  })
                }
              />
            </View>
          </View>
        ) : data?.is_accepted === 0 ? (
          <View style={{ width: "100%" }}>
            <InviteSent data={data} referralNo={referralNo} />
            <View style={[styles.emptView, { marginTop: verticalScale(20) }]} />
            <View>
              <View style={styles.bottomContent}>
                <UserCancelIcon
                  width={CustomDimensions.icon_width_20}
                  height={CustomDimensions.icon_height_20}
                />
                <Text style={styles.listHeadTitle}>Revoke Email Invite</Text>
              </View>
              <Text
                style={[
                  styles.subsContent,
                  {
                    padding: moderateScale(20),
                    paddingBottom: moderateScale(10),
                  },
                ]}
              >
                Revoking this invite means this member will be unable to accept
                the invite. If you want to invite them again, you will need to
                send them a new invitation.
              </Text>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  marginBottom: verticalScale(10),
                }}
              >
                <RemoveButton
                  value={"Revoke invite"}
                  onPress={() =>
                    setShow({
                      isOn: true,
                      dependent_id: depenDetails?.data?.user_id,
                    })
                  }
                />
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
      <RemoveDependantDialog
        txt={
          data?.is_accepted === 1 || data?.reg_id
            ? "Yes, remove this dependant"
            : data?.is_accepted === 0
            ? "Yes, revoke this invite"
            : null
        }
        txt2={
          data?.is_accepted === 0
            ? "No, keep this invite"
            : "No, keep this dependant"
        }
        screen={"dui"}
        show={isShow}
        setShow={setShow}
        email={email}
        userId={data?.id}
        reg_id={data?.reg_id}
        status={
          data?.is_accepted === 1 || data?.reg_id
            ? 0
            : data?.is_accepted === 0
            ? 1
            : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actBtn: {
    width: moderateScale(170),
    height: moderateScale(34),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    borderColor: CustomColors.new_theme_clr,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  actBtnTxt: {
    fontFamily: CustomFonts.PoppinsRegular,
    color: CustomColors.new_theme_clr,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    paddingHorizontal: verticalScale(10),
  },
  emptView: {
    marginBottom: verticalScale(10),
    borderWidth: moderateScale(4),
    width: "100%",
    borderColor: CustomColors.neutral_100,
  },
  listHead: {
    flexDirection: "row",
    paddingBottom: verticalScale(10),
    alignItems: "center",
  },
  listHeadTitle: {
    paddingHorizontal: horizontalScale(10),
    fontFamily: CustomFonts.PoppinsMedium,
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.txt_18,
    fontWeight: "500",
  },
  titleLft: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontsize: CustomFontSize.normal,
    color: CustomColors.neutral_700,
  },
  titleRht: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
  },
  subsDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(5),
    alignItems: "center",
    flexWrap: "wrap",
  },
  subsContent: {
    width: "100%",
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
  },
  bottomContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(10),
  },
  depenContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editTxt: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: 400,
    fontSize: CustomFontSize.normal,
    color: CustomColors.new_theme_clr,
  },
  membDetails: {
    width: "95%",
    // padding: moderateScale(20),
    paddingBottom: moderateScale(15),
  },
  cardMain: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "100%",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    borderColor: CustomColors.neutralgrey_200,
    backgroundColor: CustomColors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Offset
    shadowOpacity: 0.1, // Opacity
    shadowRadius: 8, // Blur radius
    // Android shadow properties
    elevation: 4, // Elevation level (can be adjusted)l
    padding: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  subsTxt: {
    fontFamily: CustomFonts.PoppinsMedium,
    fontWeight: "500",
    fontSize: CustomFontSize.txt_18,
    color: CustomColors.neutral_700,
  },
  subsContent: {
    width: "100%",
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
  },
});
