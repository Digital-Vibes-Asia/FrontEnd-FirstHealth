import { View, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ActionBar from '../../../common/ActionBar/actionbar';
import GreyAvatarBox from '../../../common/AlertBox/greyavatarbox';
import AddmemberTitle from '../../../common/TittleBox/addmembertitle';
import AddMemberTitle2 from '../../../common/TittleBox/addmembertitle2';

import InviteMailCard from '../../../common/Referralshare/invitemailcard';
import ManualRegistrationCard from '../../../common/Referralshare/manualregistrationcard';
import { useGetQuery, usePostMutation } from '../../../store/api';
import { UrlBase } from '../../../utils/common/urlbase';
import { seteditmgavailslot } from '../../../store/value';


const SPReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function AddMember({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const type = useSelector(
    state => state.operation?.type,
  );
  const select_data = useSelector(
    state => state.operation?.select_data,
  );


  const paramdata = route?.params?.param


  const [PostMail, { data, error }] =
    usePostMutation();

  const [formState, dispatch] = useReducer(SPReducer, {
    mail: "",
    progress: false,
  });

  useEffect(() => {
    if (data) {
      setRedux(seteditmgavailslot({
        id: select_data.Id,
        name: formState.mail,
        man_reg: false,
      }))

      navigation.navigate("inviteSucess", {
        mail: formState.mail,
        refcode: route?.params?.referal
      })
      handleChange({ progress: false })

    }
    else if (error) {
      console.log(JSON.stringify(error) + "error...")
      if (!error?.data?.status) {
        navigation.navigate("unsuccess", {
          mail: formState.mail
        })

      }

      handleChange({ progress: false })
      // Alert.alert("Error", JSON.stringify(error))
    }


  }, [data, error]);

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };



  function validation() {

    if (formState.mail == "") {
      Alert.alert("Alert", "Please enter mail")
    } else {
      handleChange({ progress: true })
      let type;
      switch (select_data?.type) {
        case "Adult member":
          type = "Adult";
          break;
        case "Senior member":
          type = "Senior";
          break;
        case "Child member":
          type = "Child";
          break;
      }
      PostMail({
        data: {
          email: formState.mail,
          type_dependant: type,
        },
        url: UrlBase.EMAIL_SENT,
      });

    }


  }

  return (
    <>
      <View style={{ height: Dimensions.get('window').height }}>

        <ActionBar
          txt={'Add Member'}
          onPress={() => {
            navigation.goBack();
          }}></ActionBar>

        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          bounces={true}>
          <View style={{ marginHorizontal: '5%' }}>
            <View style={{ marginTop: '10%', alignSelf: 'center' }}>
              <GreyAvatarBox></GreyAvatarBox>
            </View>

            <View style={{ marginTop: '2%', alignSelf: 'center' }}>
              <AddmemberTitle txt={paramdata?.type} txt2={`{${paramdata?.range}}`}></AddmemberTitle>
            </View>
            <View style={{ marginTop: '5%', alignSelf: 'center', marginHorizontal: "10%" }}>
              <AddMemberTitle2 txt="Choose how to add this dependant to your plan" ></AddMemberTitle2>
            </View>
            <View style={{ marginTop: '5%', }}>
              <InviteMailCard hint={"name@email.com"} value={formState.mail}
                onchange={(param) => {
                  handleChange({ mail: param });
                }} onPress={() => {
                  validation()
                }}
                progress={formState.progress}

              ></InviteMailCard>
            </View>
            <View style={{ marginTop: '5%', }}>
              <ManualRegistrationCard hint={"name@email.com"} value={formState.mail} onchange={(param) => {
                handleChange({ mail: param });
              }} onPress={() => {
                navigation.navigate("mr")
              }} ></ManualRegistrationCard>
            </View>
          </View>
        </ScrollView>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alertcontainer: { marginTop: '10%', marginHorizontal: '5%' },
  logocontainer: { marginTop: '10%' },
  margin_5: {
    marginTop: '5%',
  },
  subtxtcontainer: {
    marginHorizontal: '10%',
  },
});
