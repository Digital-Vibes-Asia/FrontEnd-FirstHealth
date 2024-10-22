import {
  View,
  StyleSheet,
  ScrollView,
  Alert,

} from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ActionBar from '../../common/ActionBar/actionbar';
import StepTxt from '../../common/TittleBox/steptxt';
import SignupTitle from '../../common/TittleBox/signuptitle';
import NumberInputBox from '../../common/textinputbox/numberinputbox';
import NextFhButton from '../../common/Button/nextfhbutton';
import Progressing from '../../common/Progress/Progressing';
import { UrlBase } from '../../utils/common/urlbase';
import { usePostMutation } from '../../store/api';
import NameInputBox from '../../common/textinputbox/nameinputbox';

const PIReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function RefferalNumber() {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const reg_id = useSelector(
    state => state.operation?.temp_regid,
  );

  const [step5, { data, error }] =
    usePostMutation();


  const [formState, dispatch] = useReducer(PIReducer, {
    referral: "",
    progressBar: false,

  });

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };

  useEffect(() => {
    console.log(JSON.stringify(data) + " What is the Data...")

    if (data) {
      if (!data?.is_valid) {
        navigation.navigate("subp")

      }
      else {
        if (data?.eligible_plans.length > 0) {
          navigation.navigate("exp", {
            refer_id: formState?.referral,
            age_group: data?.age_group

          })
        }
        else {
          navigation.navigate("ns", {
            plan: data?.subscription_plan
          })
        }

      }
    }
    else if (error) {
      // navigation.navigate("subp")
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message),
      );
    }
    handleChange({ progressBar: false });

  }, [data, error]);

  function validation() {
    if (formState.referral != "") {
      step5({
        data: {
          referral_number: formState.referral,
          id: reg_id,
        },
        url: UrlBase.STEP5,
      });

    }
    else {
      navigation.navigate("subp")

    }

  }




  return (
    <>
      <ActionBar txt={"Registration"} progress={5 / 7} onPress={() => {
        navigation.goBack()
      }}></ActionBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}>

        <View style={{ marginHorizontal: "5%" }}>
          <View style={{ marginTop: "5%" }}>
            <StepTxt txt={"STEP 5 of 7"}></StepTxt>
          </View>
          <View style={{ marginVertical: "2%", marginHorizontal: "5%" }}>
            <SignupTitle txt="Do you have a referral account number?"></SignupTitle>
          </View>
          <View style={{ marginTop: "2%" }}>
            <NameInputBox
              title={"Referral account number"}
              hint={"FH123456"}
              value={formState.referral} onChangeText={(param) => {
                handleChange({ referral: param });
              }}></NameInputBox>


          </View>

        </View>

      </ScrollView>
      <>
        {!formState.progressBar ?
          <NextFhButton value={"Next, choose your membership"} onPress={() => {
            validation()
          }}></NextFhButton> : <Progressing></Progressing>
        }
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
    marginTop: "5%"
  },
  subtxtcontainer: {
    marginHorizontal: "10%"

  }


});
