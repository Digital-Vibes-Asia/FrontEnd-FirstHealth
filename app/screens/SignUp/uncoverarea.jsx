import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  TextInput,
  ActivityIndicator,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import ActionBar from '../../common/ActionBar/actionbar';

import SignupTitle from '../../common/TittleBox/signuptitle';

import UncoverMap from '../../common/ImageBox/uncovermap';

import OutsideAlert from '../../common/AlertBox/outsidealert';
import MailIconButton from '../../common/Button/mailicobutton';
import BackHomeButton from '../../common/Button/backhomebutton';

import UncoverAlert from '../../common/TittleBox/uncoveralert';
import { UrlBase } from '../../utils/common/urlbase';
import Progressing from '../../common/Progress/Progressing';
import { usePostMutation } from '../../store/api';





const PIReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function UncoverArea() {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  const [Notify, { data, error }] =
    usePostMutation();
  const reg_id = useSelector(
    state => state.operation?.temp_regid,
  );


  const [formState, dispatch] = useReducer(PIReducer, {
    progressBar: false,

  });

  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data) + " Data is what..."
      )
      navigation.navigate("nn", {
        mail: data?.email
      })
    }
    else if (error) {
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message),
      );
    }
    handleChange({ progressBar: false });

  }, [data, error]);

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };

  function handlenotify() {
    handleChange({ progressBar: true })
    Notify({
      data: {
        id: reg_id,
        remindme: 1,

      },
      url: UrlBase.NOTIFY,
    });


  }






  return (
    <>
      <ActionBar txt={"Registration"} onPress={() => {
        navigation.goBack()
      }}></ActionBar>
      <View style={{ flex: 1 }}>
        <UncoverMap></UncoverMap>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          bounces={true}>

          <View style={{ marginHorizontal: "8%" }}>

            <View style={{ margin: "2%" }}>
              <View style={{ alignSelf: "center", marginVertical: "5%" }}>
                <OutsideAlert></OutsideAlert>
              </View>
              <SignupTitle txt="Outside of Coverage Area"></SignupTitle>
              <View style={{ marginTop: "5%" }}>
                <UncoverAlert txt={"We're sorry, but your address is currently outside our coverage area, so we can't create an account for you right now. However, we'd be happy to notify you by email once your area is supported."}></UncoverAlert>
              </View>
            </View>

          </View>

        </ScrollView>
      </View>
      <>
        <View style={styles.buttoncontainer}>
          {!formState.progressBar ?
            <MailIconButton value={"Yes, email me "} onPress={handlenotify}></MailIconButton>
            :
            <Progressing></Progressing>
          }
          <BackHomeButton value={"Back to Home"} onPress={() => {
            navigation.navigate("start")
          }}></BackHomeButton>
        </View>
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
  },
  buttoncontainer:
    { position: "absolute", bottom: 0, width: "100%" }



});
