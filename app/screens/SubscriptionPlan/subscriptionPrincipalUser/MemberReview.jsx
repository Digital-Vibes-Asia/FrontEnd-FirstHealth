import { Alert, StyleSheet, Text, View } from "react-native";
import ActionBar from "../../../common/ActionBar/actionbar";
import { horizontalScale, verticalScale } from "../../../utils/common/Metrics";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
} from "../../../utils/common/CustomStyles";
import TitleContain from "../../../common/textbox/TitleContain";
import { useNavigation } from "@react-navigation/native";
import RowView from "../../../common/textbox/RowText";
import Warning from "../../../assets/icon/warnInfo.svg";
import ExclaimationUp from "../../../assets/icon/ExclaimUp.svg";
import CheckList from "../../../assets/icon/check_circle.svg";
import ExclaimDown from "../../../assets/icon/ExclaimDown.svg";
import MembersCovered from "../../../common/SubscriptionPlan/memberscovered";
import PlanAmount from "../../../common/SubscriptionPlan/planamount";
import RegisterButton from "../../../common/Button/registerbutton";
import { useSelector } from "react-redux";
import { useGetQuery, usePostMutation } from "../../../store/api";
import { UrlBase } from "../../../utils/common/urlbase";
import { useEffect, useMemo, useReducer } from "react";
import moment from "moment";
import { ScrollView } from "react-native";

const MemberRenew = () => {
  const PIReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, ...action.fields };
      default:
        return state;
    }
  };
  const [renewAPI, { data, error: err }] = usePostMutation();

  const {
    data: profileData,
    error,
    refetch,
  } = useGetQuery(UrlBase.PROFILEVIEW);
  const {
    data: memberData,
    error: memError,
    refetch: memberRefetch,
  } = useGetQuery(UrlBase.GET_MEMBERLIST);
  const {
    data: subsData,
    error: subsError,
    refetch: subsRefetch,
  } = useGetQuery(UrlBase.GETSUBSPLAN);

  const userData = useMemo(() => {
    return {
      f_name: `${profileData?.registration?.first_name} ${profileData?.registration?.last_name}`,
    };
  });
  const details = useMemo(() => {
    return profileData?.user_subscription;
  });
  console.log(subsData, "shkbsjk subsData");
  const IconRow = ({ desc, icon }) => {
    return (
      <View style={[styles.inline, { gap: horizontalScale(10) }]}>
        <CheckList
          width={CustomDimensions.icon_width_15}
          height={CustomDimensions.icon_height_15}
        />
        <Text style={styles.desc}>{desc}</Text>
        {icon && (
          <ExclaimDown
            width={CustomDimensions.icon_width_15}
            height={CustomDimensions.icon_height_15}
          />
        )}
      </View>
    );
  };
  const [formState, dispatch] = useReducer(PIReducer, {
    getdata: {},
    child: 0,
    senior: 0,
    adult: 0,
    default_child: 0,
    default_senior: 0,
    default_adult: 0,
    total: 0,
    membersData: [],
  });

  useEffect(() => {
    if (data) {
      // Alert.alert("Success")
      console.log(data + "Ssss Data....")
      const detail = (data?.data?.detail);
      const email = data?.data?.email;
      const phone = data?.data?.phone;
      const amount = data?.data?.amount;
      const orderId = data?.data?.order_id;
      const hash = data?.data?.hash;
      const productName = data?.data?.name;
      
      navigation.navigate("senapay",{amount, productName, orderId, email, phone,hash,detail,redirect:"renewsuccess"})
      // console.log(urlData, "paymentUrl");
      // setPaymentHit(urlData);
    } else if (err) {
      Alert.alert(
        JSON.stringify(err?.status),
        JSON.stringify(err?.data?.message),
      );

    }


  }, [data, err])

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  useEffect(() => {
    if (memberData) {
      handleChange({ ProgressBar3: false, membersData: memberData });
    } else if (memError) {
      Alert.alert(
        JSON.stringify(memError?.status),
        JSON.stringify(memError?.data?.message)
      );
      handleChange({ ProgressBar3: false });
    }
    // handleChange({ progressBar: false });
  }, [memberData, memError]);

  useEffect(() => {
    console.log(subsData, "subsData333subsData");
    const userPrice =
      parseInt(subsData?.user_subscription?.subscription_master?.price) || 0;

    // Get the total price from dependent_users array
    const dependentsPrice = subsData?.dependent_users.reduce(
      (total, dependent) => {
        return total + (dependent?.subscription_master?.price || 0);
      },
      0
    );
    handleChange({ total: formState.total + userPrice + dependentsPrice });
  }, [subsData]);

  const navigation = useNavigation();
  function handledebandant(type, selected) {
    console.log(JSON.stringify(memberData) + "....membersData...");
    let amt = 0;
    switch (type) {
      case "add":
        let updatearr = formState.membersData.map((item) => {
          if (item.id === selected.id) {
            // item.count = item.count + 1
            amt = item.price;

            return { ...item, count: item.count + 1 };
          }
          return item;
        });

        handleChange({ membersData: updatearr, total: formState.total + amt });

        // if (what == 'add') {
        //   handleChange({ child: formState.child + 1, total: formState.total + 150 });

        // }
        // else {
        //   if (0 < formState.child) {
        //     handleChange({ child: formState.child - 1, total: formState.total - 150 })
        //   }
        // }

        break;
      case "sub":
        amt = 0;

        let newarr = formState.membersData.map((item) => {
          if (item.count > 0) {
            if (item.id === selected.id) {
              // item.count = item.count + 1
              amt = item.price;
              return { ...item, count: item.count - 1 };
            }
          }
          return item;
        });

        handleChange({ membersData: newarr, total: formState.total - amt });
        // if (what == 'add') {
        //   handleChange({ adult: formState.adult + 1, total: formState.total + 150 });

        // }
        // else {
        //   if (0 < formState.adult) {
        //     handleChange({ adult: formState.adult - 1, total: formState.total - 150 });
        //   }

        // }

        break;
      // case "senior":
      // if (what == 'add') {
      //   handleChange({ senior: formState.senior + 1, total: formState.total + 250 });

      // }
      // else {
      //   if (0 < formState.senior) {
      //     handleChange({ senior: formState.senior - 1, total: formState.total - 250 });
      //   }

      // }
      // break
    }
  }

  useEffect(() => {
    console.log(formState, "payload formstate");
  }, [formState]);

  const handleSubmit = () => {
    let child_count = 0;
    let senior_count = 0;
    let adult_count = 0;

    formState.membersData.forEach((item) => {
      console.log();
      switch (item.id) {
        case 1:
          adult_count = item.count;
          break;
        case 2:
          child_count = item.count;
          break;
        case 3:
          senior_count = item.count;
          break;
      }
    });
    renewAPI({
      data: { child_count, senior_count, adult_count, amount: formState?.total },
      url: UrlBase.RENEW_USER,
    });
    console.log(
      { child_count, senior_count, adult_count },
      "ISAP   HITE Error or rebew"
    );
  };

  const totalCount = formState.membersData.reduce(
    (sum, member) => sum + member.count,
    0
  );

  return (
    <View style={styles.body}>
      <ActionBar
        txt={"Membership Review"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        bounces={false}
      >
        <View>
          <Text style={styles.renewHead}>Renew your Membership</Text>
          <View style={[styles.emptView, { marginTop: verticalScale(20) }]} />
          <View style={{ gap: verticalScale(12) }}>
            <TitleContain isEditable={false} subTitle={"Adult Membership"} />
            <View style={{ marginHorizontal: horizontalScale(8) }}>
              <RowView
                title={"Coverage Start Date"}
                desc={moment(details?.start_date).format("DD MMMM YYYY")}
              />
              <RowView
                title={"Coverage End Date"}
                desc={moment(details?.end_date).format("DD MMMM YYYY")}
              />
            </View>
            <View style={[styles.inline, styles.inlineWarn]}>
              <Warning
                width={CustomDimensions.icon_width_25}
                height={CustomDimensions.icon_height_25}
              />
              <View style={{ width: "85%", gap: verticalScale(4) }}>
                <Text style={[styles.planDesc, styles.planMain]}>
                  This plan will have{" "}
                  <Text style={[styles.planDesc, styles.planSpan]}>
                    14-day Qualifying Period
                  </Text>{" "}
                  before it takes into effect.
                </Text>
                <View style={[styles.inline]}>
                  <Text
                    style={[
                      styles.planDesc,
                      {
                        color: CustomColors.new_theme_clr,
                        fontFamily: CustomFonts.PoppinsRegular,
                      },
                    ]}
                  >
                    What is a Qualifying Period?
                  </Text>
                  <ExclaimationUp
                    width={CustomDimensions.icon_width_15}
                    height={CustomDimensions.icon_height_15}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.emptView, { marginTop: verticalScale(20) }]} />
          <View style={{ gap: verticalScale(12) }}>
            <TitleContain isEditable={false} subTitle={"Membership Benefits"} />
            <View
              style={{
                marginHorizontal: horizontalScale(8),
                gap: horizontalScale(10),
              }}
            >
              <IconRow
                desc={`${subsData?.user_subscription?.t_emergency_calls} x Emergency Trips`}
                icon={true}
              />
              <IconRow
                desc={`${subsData?.user_subscription?.t_clinic_calls} x Non-Emergency Trips`}
                icon={true}
              />
              {subsData?.user_subscription?.subscription_master?.benefits?.map(
                (data) => (
                  <IconRow desc={data?.benefit_description} key={data?.id} />
                )
              )}
            </View>
          </View>
          <View style={[styles.emptView, { marginTop: verticalScale(20) }]} />
          <MembersCovered
            titile={"Members Covered"}
            members={subsData?.dependent_users}
            onpress={handledebandant}
            data={userData}
            membersData={formState?.membersData}
            totalCount={totalCount}
          ></MembersCovered>
        </View>
      </ScrollView>
      <View>
        <PlanAmount total={formState.total} />
        {/* {!formState.progressBar2 ? ( */}
        <RegisterButton
          value={"Proceed to Payment"}
          onPress={handleSubmit}
        ></RegisterButton>
        {/* ) : (
        <Progressing></Progressing>
      )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    gap: verticalScale(32),
    flex: 1,
  },
  inline: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(2),
  },
  inlineWarn: {
    marginHorizontal: horizontalScale(8),
    gap: verticalScale(8),
    borderRadius: horizontalScale(4),
    padding: verticalScale(16),
    borderWidth: horizontalScale(1),
    borderStyle: "dashed",
    borderColor: CustomColors.info_bg,
    backgroundColor: CustomColors.info_bg2,
  },
  planDesc: {
    lineHeight: verticalScale(14),
    fontSize: verticalScale(12),
    color: CustomColors.neutral_700,
  },
  desc: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(14),
    color: CustomColors.neutral_600,
    lineHeight: verticalScale(18),
    maxWidth: "90%",
  },
  planMain: {
    fontFamily: CustomFonts.PoppinsRegular,
  },
  planSpan: {
    fontFamily: CustomFonts.PoppinsSemiBold,
  },
  renewHead: {
    fontSize: verticalScale(22),
    lineHeight: verticalScale(26),
    fontFamily: CustomFonts.PoppinsRegular,
    textAlign: "center",
    color: CustomColors.neutral_700,
  },
  emptView: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 4,
    width: "100%",
    borderColor: CustomColors.neutral_100,
  },
});

export default MemberRenew;