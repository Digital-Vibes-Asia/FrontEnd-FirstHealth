import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Alert,
  PermissionsAndroid, Platform,

} from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import SigninButton from '../../common/Button/signinbutton';
import MailSuccessTxt from '../../common/TittleBox/mailsuccesstxt';
import { useSelector } from 'react-redux';
import RegisterButton from '../../common/Button/registerbutton';
import AlertIcon from '../../common/AlertBox/alerticon';
import AlertText from '../../common/AlertBox/alerttext';
import ThemeSuccessText from '../../common/TittleBox/themesuccesstxt';
import SSimpleText from '../../common/TittleBox/ssimpletxt';
import SmallText from '../../common/TittleBox/smalltext';
import KeyBox from '../../common/AlertBox/keybox';
import LoginTitle from '../../common/TittleBox/logintitle';
import FhLoginButton from '../../common/Button/fhloginbutton';
import FhCancelButton from '../../common/Button/fhcancelbutton';
import { verticalScale, horizontalScale } from '../../utils/common/Metrics';
import GPS from "../../assets/icon/gpslost.svg"
import { CustomColors, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';




const StartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function GpsSignalLoss({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  console.log(JSON.stringify(route) + " route...")

  const mail = useSelector(
    state => state.operation?.temp_data?.mail,
  );

  const requestLocationPermission = async () => {
    console.log("Anboooo")


    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Location permission denied');
        return;
      }
    }
  
  };





  const [formState, dispatch] = useReducer(StartReducer, {


  });

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };



  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}>
        <View style={styles.container}>
          <View style={{ marginTop: "40%", alignSelf: "center" }}>
            <LoginTitle txt="Allow GPS Permissions"></LoginTitle>
          </View>
          <View style={{ marginTop: "2%", alignSelf: "center" }}>
            <Text style={styles.txt}>To track your location accurately,please allow your phone’s GPS permissions.</Text>
          </View>
          <GPS></GPS>
        </View>

      </ScrollView>
      <>
        <View style={{ marginHorizontal: horizontalScale(10) }}>
          <FhLoginButton
            value={"Enable GPS Permissions"}
            onPress={() => {
              requestLocationPermission()

            }}
          />
          <View style={{ marginTop: verticalScale(10), marginBottom: verticalScale(10) }}>
            <FhCancelButton
              value={"Not now"}
              onPress={() => {

              }}
            />
          </View>
        </View>


      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(20)

  },
  alertcontainer: { marginTop: "10%", marginHorizontal: "5%" },
  logocontainer: { marginTop: "10%" },
  margin_5: {
    marginTop: "5%"
  },
  subtxtcontainer: {
    marginHorizontal: "10%",
    marginTop: "5%",

  },
  txt: {
    color: CustomColors.neutral_600,
    fontSize: CustomFontSize.txt_18,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(22),
    textAlign: "center",
  },


});
