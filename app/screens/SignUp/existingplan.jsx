import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useEffect, useState, useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ActionBar from "../../common/ActionBar/actionbar";
import StepTxt from "../../common/TittleBox/steptxt";
import SignupTitle from "../../common/TittleBox/signuptitle";
import SubscriptionBox from "../../common/SubscriptionPlan/subscriptionbox";
import FAQ from "../../common/SubscriptionPlan/faq";
import MorePlan from "../../common/TittleBox/moreplan";
import FaqTitle from "../../common/TittleBox/faqtitle";
import { UrlBase } from "../../utils/common/urlbase";
import Progressing from "../../common/Progress/Progressing";
import { usePostMutation, useGetQuery } from "../../store/api";
import ExistingPlanCard from "../../common/SubscriptionPlan/existingplancard";
import QualifyPeriod from "../../common/AlertBox/qualifyperiod";
import RegisterButton from "../../common/Button/registerbutton";
import SimpleText from "../../common/SubscriptionPlan/simpletxt";
import ThemeSimpleText from "../../common/SubscriptionPlan/themesimpletxt";

const PIReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function ExistingPlan({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const screen = route?.params?.screen;

  const reg_id = useSelector((state) => state.operation?.temp_regid);

  const [AddSubstip, { data: supData, error: supError }] = usePostMutation();

  const {
    data: faqData,
    error: faqError,
    refetch: faqRefetch,
  } = useGetQuery(UrlBase.GETFAQ);

  console.log(JSON.stringify(route) + " route..");

  const [getDetail, { data, error }] = usePostMutation();

  const [formState, dispatch] = useReducer(PIReducer, {
    medical: "",
    s_code: "",
    progressBar: true,
    progressBar2: false,
    // plan_data: route?.params?.data?.user_subscription
    plan_data: {},
  });

  console.log(formState.progressBar + " Progressbar Status...");

  useEffect(() => {
    if (data) {
      if (data?.error) {
        handleChange({ progressBar: false });
        navigation.navigate('main', {
          screen: 'Subscription',
        });
      } else {
        handleChange({
          plan_data: data?.user_subscription,
          progressBar: false,
        });
      }
    } else if (error) {
      handleChange({ progressBar: false });
      // navigation.navigate("subp")
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message)
      );
    }
  }, [data, error]);

  useEffect(() => {
    getDetail({
      data: {
        referral_no: route?.params?.refer_id,
      },
      url: UrlBase.REFERENCE_PLAN,
    });
  }, []);

  useEffect(() => {
    console.log(supData,"test exists", supError)
    if (supData) {
      if (supData?.is_accepted) {
        navigation.navigate("ps");
      } else {
        navigation.navigate("subp");
      }
    } else if (supError) {
      Alert.alert(
        JSON.stringify(supError?.status),
        JSON.stringify(supError?.data?.message)
      );
    }
    handleChange({ progressBar2: false });
  }, [supData, supError]);

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  console.log("reg_id", reg_id);
  console.log("route?.params?.refer_id", route?.params?.refer_id);
  console.log("route?.params?.age_group", route?.params?.age_group);

  function planApiCall(status) {
    handleChange({ progressBar2: true });
    AddSubstip({
      data: {
        user_id: reg_id,
        referral_no: route?.params?.refer_id,
        age_group: route?.params?.age_group,
        accepted: status,
      },
      url: UrlBase.ADDPLAN,
    });
  }

  function handlebutton(item) {
    // switch (item.id) {
    //   case 1:
    //     navigation.navigate("rm")
    //     break;
    //   case 2:
    //     break;
    //   case 3:
    //     navigation.navigate("rm")
    //     break;
    // }
  }

  return (
    <>
      <ActionBar
        progress={screen === "freeUser" ? null : 6 / 7}
        txt={"Subscription Plan"}
        onPress={() => {
          navigation.goBack();
        }}
      ></ActionBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}
      >
        <View style={{ marginHorizontal: "5%", marginBottom: "5%" }}>
          <View style={{ marginTop: "5%" }}>
            <StepTxt
              txt={screen === "freeUser" ? null : "STEP 6 of 7"}
            ></StepTxt>
          </View>
          <View style={{ marginVertical: "2%", marginHorizontal: "2%" }}>
            <SignupTitle txt="You have been invited to an existing plan"></SignupTitle>
          </View>
          {!formState.progressBar ? (
            <View style={{ marginTop: "2%" }}>
              <ExistingPlanCard
                onPress={handlebutton}
                item={data}
              ></ExistingPlanCard>
              {formState.plan_data?.is_qualifying_period && (
                <QualifyPeriod
                  txt="Your subscription will have a "
                  txt2={"14-day Qualifying Period "}
                  txt3={"before it takes into effect"}
                  txt4={"What is the Qualifying Period?"}
                ></QualifyPeriod>
              )}
            </View>
          ) : (
            <Progressing></Progressing>
          )}
        </View>
      </ScrollView>
      <>
        <SimpleText
          txt={"Would you like to be added to this plan?"}
        ></SimpleText>
        <RegisterButton
          value={"Yes,add me to this plan"}
          onPress={() => {
            planApiCall(true);
          }}
        ></RegisterButton>
        <ThemeSimpleText
          txt={"No, I want to subscribe to a separate plan"}
          onPress={() => {
            planApiCall(false);
          }}
        ></ThemeSimpleText>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alertcontainer: { marginTop: "10%", marginHorizontal: "5%" },
  logocontainer: { marginTop: "10%" },
  margin_5: {
    marginTop: "5%",
  },
  subtxtcontainer: {
    marginHorizontal: "10%",
  },
});
