import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  TextInput,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { useEffect, useState, useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { CustomDimensions } from "../../utils/common/CustomFont";
import AlertBox from "../../common/AlertBox/alertbox";
import Logo from "../../common/ImageBox/logo";
import WelcomeBox from "../../common/TittleBox/welcomebox";
import StartingPageImage from "../../common/ImageBox/startingpageimage";
import StartingPageTxt from "../../common/TittleBox/startingpagetxt";
import SigninButton from "../../common/Button/signinbutton";
import RegisterButton from "../../common/Button/registerbutton";
import CarouselBox from "../../common/ActionBox/carouselbox";
import ActionBar from "../../common/ActionBar/actionbar";
import StepTxt from "../../common/TittleBox/steptxt";
import SignupTitle from "../../common/TittleBox/signuptitle";
import SubscriptionBox from "../../common/SubscriptionPlan/subscriptionbox";
import SubscriptionCode from "../../common/textbox/susbscriptioncode";
import FhInputBox from "../../common/textinputbox/fhinputbox";
import FAQ from "../../common/SubscriptionPlan/faq";
import AddButton from "../../common/Button/addbutton";
import { CustomColors } from "../../utils/common/CustomStyles";
import PlanDates from "../../common/SubscriptionPlan/plandates";
import PlanBenefits from "../../common/SubscriptionPlan/planbenefits";
import NextFhButton from "../../common/Button/nextfhbutton";
import MembersCovered from "../../common/SubscriptionPlan/memberscovered";
import PlanAmount from "../../common/SubscriptionPlan/planamount";
import { useGetQuery } from "../../store/api";
import { UrlBase } from "../../utils/common/urlbase";
import Progressing from "../../common/Progress/Progressing";
import { ProgressBar } from "react-native-paper";
import { usePostMutation } from "../../store/api";
import { addSlotCart } from "../../store/value";

const PIReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function ReviewMembership({ route }) {
  const screen = route?.params?.screen;
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const {
    data: plandata,
    error: planerror,
    isLoading: loading,
    refetch: planrefetch,
  } = useGetQuery(UrlBase.GETPLANINFO + route?.params?.id);
  const {
    data: membersData,
    error: membersError,
    isLoading: membersLoading,
    refetch: mebersRefetch,
  } = useGetQuery(UrlBase.GET_MEMBERLIST);

  console.log(JSON.stringify(membersData) + "..Members Data.");

  const reg_id = useSelector((state) => state.operation?.temp_regid);

  const temp_data = useSelector((state) => state.operation?.temp_data);
  const [pay, { data: paydata, error: payerror }] = usePostMutation();

  // useEffect(() => {
  //   if (paydata) {
  //     if (screen === "freeMembership" || screen === "dependantUser") {
  //       navigation.navigate("main", {
  //         screen: "Subscription",
  //       });
  //     } else {
  //       navigation.navigate("isuccess");
  //     }
  //   } else if (payerror) {
  //     Alert.alert(
  //       JSON.stringify(payerror?.status),
  //       JSON.stringify(payerror?.data?.message)
  //     );
  //   }
  //   // handleChange({ progressBar: false });
  // }, [paydata, payerror]);

  useEffect(() => {
    if (paydata) {
      // Alert.alert("Success")
      console.log(paydata , "Ssss Data....")
      const detail = (paydata?.data?.detail);
      const email = paydata?.data?.email;
      const phone = paydata?.data?.phone;
      const amount = paydata?.data?.amount;
      const orderId = paydata?.data?.order_id;
      const hash = paydata?.data?.hash;
      const productName = paydata?.data?.name;
      
      navigation.navigate("senapay",{amount, productName, orderId, email, phone,hash,detail,redirect:"isuccess"})
      // console.log(urlData, "paymentUrl");
      // setPaymentHit(urlData);
    } else if (payerror) {
      console.log(payerror,"payerror shshs")
      Alert.alert(
        JSON.stringify(payerror?.status),
        JSON.stringify(payerror?.data?.message),
      );

    }


  }, [paydata, payerror])

  const [formState, dispatch] = useReducer(PIReducer, {
    ProgressBar: true,
    getdata: {},
    child: 0,
    senior: 0,
    adult: 0,
    default_child: 0,
    default_senior: 0,
    default_adult: 0,
    total: 0,
    ProgressBar2: false,
    ProgressBar3: false,
    membersData: [],
  });

  useEffect(() => {
    if (membersData) {
      handleChange({ ProgressBar3: false, membersData: membersData });
    } else if (membersError) {
      Alert.alert(
        JSON.stringify(membersError?.status),
        JSON.stringify(membersError?.data?.message)
      );
      handleChange({ ProgressBar3: false });
    }
    // handleChange({ progressBar: false });
  }, [membersData, membersError]);

  useEffect(() => {
    if (plandata) {
      console.log(JSON.stringify(plandata) + " Plan Data...");
      handleChange({ getdata: plandata, total: plandata?.price });
    } else if (planerror) {
      Alert.alert(
        JSON.stringify(planerror?.status),
        JSON.stringify(planerror?.data?.message)
      );
    }

    handleChange({ progressBar2: false });
  }, [plandata, planerror]);

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  function validation() {
    handleChange({ progressBar2: true });
    let child_count = 0;
    let senior_count = 0;
    let adult_count = 0;

    formState.membersData.forEach((item) => {
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

    const data = {
      user_id: reg_id,
      subscription_id: formState?.getdata?.id,
      child_count: child_count,
      senior_count: senior_count,
      adult_count: adult_count,
    }

    setRedux(addSlotCart(data))
    console.log(data,"Test suhs")
    pay({
      data: {
        user_id: reg_id,
        subscription_id: formState?.getdata?.id,
        // child_count: child_count,
        // senior_count: senior_count,
        // adult_count: adult_count,
        amount: formState.total
      },
      url: UrlBase.STEP6,
    });
  }

  function handledebandant(type, selected) {
    console.log(JSON.stringify(membersData) + "....membersData...");
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

  const totalCount = formState.membersData.reduce(
    (sum, member) => sum + member.count,
    0
  );

  return (
    <>
      <ActionBar
        progress={7 / 7}
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
        <View style={{ backgroundColor: CustomColors.white }}>
          {screen === "freeMembership" || screen === "dependantUser" ? null : (
            <View style={{ marginTop: "5%" }}>
              <StepTxt txt={"STEP 7 of 7"}></StepTxt>
            </View>
          )}
          <View style={{ marginVertical: "4%", marginHorizontal: "5%" }}>
            <SignupTitle txt="Review your membership"></SignupTitle>
          </View>
        </View>
        {!loading ? (
          <>
            <PlanDates titile={formState.getdata?.plan}></PlanDates>
            <PlanBenefits
              titile={"Membership Benefits"}
              review={formState?.getdata}
            ></PlanBenefits>
            {!membersLoading && (
              <MembersCovered
                titile={"Members Covered"}
                members={[]}
                onpress={handledebandant}
                data={temp_data}
                membersData={formState.membersData}
                totalCount={totalCount}
              ></MembersCovered>
            )}
          </>
        ) : (
          <Progressing></Progressing>
        )}
      </ScrollView>
      {!loading && (
        <>
          <PlanAmount total={formState.total}></PlanAmount>
          {!formState.progressBar2 ? (
            <RegisterButton
              value={"Checkout Now"}
              onPress={() => {
                validation();
              }}
            ></RegisterButton>
          ) : (
            <Progressing></Progressing>
          )}
        </>
      )}
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