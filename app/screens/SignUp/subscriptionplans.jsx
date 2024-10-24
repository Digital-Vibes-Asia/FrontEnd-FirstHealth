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

const PIReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function SubscriptionPlans({ route }) {
  const screen = route?.params?.screen;
  console.log('screen', screen)

  const navigation = useNavigation();
  const setRedux = useDispatch();

  const reg_id = useSelector((state) => state.operation?.temp_regid);

  const [GetPlan, { data: plandata, error: planerror }] = usePostMutation();

  const [pay, { data: paydata, error: payerror }] = usePostMutation();

  const {
    data: faqData,
    error: faqError,
    refetch: faqRefetch,
  } = useGetQuery(UrlBase.GETFAQ);

  console.log(JSON.stringify(faqData) + " Frequently Asked Question..");

  const [formState, dispatch] = useReducer(PIReducer, {
    medical: "",
    s_code: "",
    plan_data: [],
  });

  useEffect(() => {
    GetPlan({
      data: {
        user_id: reg_id,
      },
      url: UrlBase.GETPLAN,
    });
  }, []);

  useEffect(() => {
    if (plandata) {
      handleChange({ plan_data: plandata });
      console.log(JSON.stringify(plandata) + " Data is here..");
      // navigation.navigate("subp")
    } else if (planerror) {
      Alert.alert(
        JSON.stringify(planerror?.status),
        JSON.stringify(planerror?.data?.message)
      );
    }
    handleChange({ progressBar: false });
  }, [plandata, planerror]);

  useEffect(() => {
    if (paydata) {
      if (screen === "freeMembership" || screen === "dependantUser") {
        navigation.navigate("main", {
          screen: "Subscription",
        });
      } else {
        navigation.navigate("isuccess");
      }
    } else if (payerror) {
      Alert.alert(
        JSON.stringify(payerror?.status),
        JSON.stringify(payerror?.data?.message)
      );
    }
    // handleChange({ progressBar: false });
  }, [paydata, payerror]);

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  function validation() {}

  function addplan(id) {

    pay({
      data: {
        user_id: reg_id,
        subscription_id: id,
        child_count: 0,
        senior_count: 0,
        adult_count: 0,
        amount: 0
      },
      url: UrlBase.STEP6,
    });
  }

  function handlebutton(item) {
    switch (item.id) {
      case 1:
        navigation.navigate("rm", {
          id: item.id,
          screen: screen,
        });
        break;
      case 2:
        navigation.navigate("rm", {
          id: item.id,
          screen: screen,
        });
        break;
      case 3:
        addplan(item.id);

        break;
    }
  }

  const faq = [
    {
      id: 1,
      question:
        "How does the subscription plan work for the private ambulance service?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      hidden: true,
    },
    {
      id: 2,
      question:
        "What geographical areas do your private ambulance services cover?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      hidden: true,
    },
    {
      id: 3,
      question:
        "Are there any limitations on the number of emergency calls or transports covered by the subscription?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      hidden: true,
    },
    {
      id: 4,
      question:
        "How quickly can I expect an ambulance to arrive after requesting assistance?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      hidden: true,
    },
  ];

  return (
    <>
      <ActionBar
        progress={
          screen === "freeMembership" || screen === "dependantUser"
            ? null
            : 6 / 7
        }
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
        <View style={{ marginHorizontal: "5%" }}>
          {screen === "freeMembership" || screen === "dependantUser" ? null : (
            <View style={{ marginTop: "5%" }}>
              <StepTxt txt={"STEP 6 of 7"}></StepTxt>
            </View>
          )}
          <View style={{ marginVertical: "2%", marginHorizontal: "5%" }}>
            <SignupTitle txt="Choose Your Peace of Mind with Our Membership Plans"></SignupTitle>
          </View>
          {formState.plan_data.length > 0 ? (
            <>
              <View style={{ marginTop: "2%" }}>
                {formState.plan_data.map((item) => {
                  return (
                    <SubscriptionBox
                      onPress={handlebutton}
                      item={item}
                      key={item.id}
                    ></SubscriptionBox>
                  );
                })}
              </View>
              <View style={{ marginTop: "2%" }}>
                <MorePlan
                  txt={"For business plans of 50 pax & above, please contact"}
                  txt2={"salesexample@firsthealth.com"}
                ></MorePlan>
              </View>

              <View style={{ marginTop: "5%" }}>
                <FaqTitle txt="Frequently Asked Questions"></FaqTitle>
                <View style={{ marginTop: "5%", marginBottom: "2%" }}>
                  {faqData &&
                    faqData.map((item) => {
                      return <FAQ key={item.id} item={item}></FAQ>;
                    })}
                </View>
              </View>
            </>
          ) : (
            <Progressing></Progressing>
          )}
        </View>
      </ScrollView>
      <></>
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
