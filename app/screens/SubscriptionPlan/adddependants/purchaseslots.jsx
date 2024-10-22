import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useEffect, useState, useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import ActionBar from "../../../common/ActionBar/actionbar";
import StepTxt from "../../../common/TittleBox/steptxt";
import SignupTitle from "../../../common/TittleBox/signuptitle";
import CheckCoverageButton from "../../../common/Button/checkcoveragebutton";
import LabelTitle from "../../../common/textbox/labeltitle";
import ErrorInfo from "../../../common/textbox/errorinfo";
import FhInputBox from "../../../common/textinputbox/fhinputbox";
import FhDropDown from "../../../common/DropDown/fhdropdown";
import PincodeState from "../../../common/DropDown/pincodestate";
import { useSelector } from "react-redux";
import Progressing from "../../../common/Progress/Progressing";
import { UrlBase } from "../../../utils/common/urlbase";
import { usePostMutation } from "../../../store/api";
import { settemp_add } from "../../../store/value";
import WhDoubleInputBox from "../../../common/textinputbox/whdoubleinputbox";
import WhDoubleDD from "../../../common/DropDown/whdoubledd";

import PlanAmount from "../../../common/SubscriptionPlan/planamount";
import RegisterButton from "../../../common/Button/registerbutton";
import { useGetQuery } from "../../../store/api";
import PurchaseSlot from "../../../common/SubscriptionPlan/purchaseslot";

const PIReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function PurchaseSlots() {
  const navigation = useNavigation();
  const setRedux = useDispatch();
  const reg_id = useSelector((state) => state.operation?.temp_regid);

  const {
    data: membersData,
    error: membersError,
    isLoading: membersLoading,
    refetch: mebersRefetch,
  } = useGetQuery(UrlBase.GET_MEMBERLIST);

  const [Ps, { data: psdata, error: pserror }] = usePostMutation();

  const [formState, dispatch] = useReducer(PIReducer, {
    total: 0,
    membersData: [],
  });

  console.log(formState.iscovered);

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  // useEffect(() => {
  //   if (psdata) {
  //     Alert.alert("Success");
  //     console.log(JSON.stringify(psdata) + "Ps Data....");
  //   } else if (pserror) {
  //     Alert.alert(
  //       JSON.stringify(pserror?.status),
  //       JSON.stringify(pserror?.data?.message)
  //     );
  //   }
  // }, [psdata, pserror]);

  useEffect(() => {
    if (psdata) {
      // Alert.alert("Success")
      console.log(psdata + "Ssss Data....")
      const detail = (psdata?.data?.detail);
      const email = psdata?.data?.email;
      const phone = psdata?.data?.phone;
      const amount = psdata?.data?.amount;
      const orderId = psdata?.data?.order_id;
      const hash = psdata?.data?.hash;
      const productName = psdata?.data?.name;
      
      navigation.navigate("senapay",{amount, productName, orderId, email, phone,hash,detail,redirect:"purchasesuc"})
      // console.log(urlData, "paymentUrl");
      // setPaymentHit(urlData);
    } else if (pserror) {
      console.log(pserror, "paymentUrl pserror");
      Alert.alert(
        JSON.stringify(pserror?.status),
        JSON.stringify(pserror?.data?.message),
      );

    }


  }, [psdata, pserror])

  useEffect(() => {
    if (membersData) {
      handleChange({ membersData: membersData });
    } else if (membersError) {
      Alert.alert(
        JSON.stringify(planerror?.status),
        JSON.stringify(planerror?.data?.message)
      );
    }
  }, [membersData, membersError]);

  function handledebandant(type, selected) {
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

  function validation() {
    const [adult, child, senior] = formState.membersData;
    console.log(JSON.stringify(adult) + " Members Data....");

    Ps({
      data: {
        Adult: adult?.count,
        Senior: senior?.count,
        Child: child?.count,
        amount: formState?.total
      },
      url: UrlBase.PURCHASE_SLOT,
    });
  }

  const totalCount = formState.membersData.reduce(
    (sum, member) => sum + member.count,
    0
  );

  return (
    <>
      <ActionBar
        txt={"Purchase dependant slots"}
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
        <View style={{ marginTop: "5%", marginHorizontal: "5%" }}>
          <PurchaseSlot
            membersData={formState.membersData}
            onpress={handledebandant}
            totalCount={totalCount}
          ></PurchaseSlot>
        </View>
      </ScrollView>
      <>
        {formState.total != 0 && (
          <>
            <PlanAmount total={formState.total}></PlanAmount>
            {!formState.progressBar2 ? (
              <RegisterButton
                value={"Proceed to Payment"}
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
