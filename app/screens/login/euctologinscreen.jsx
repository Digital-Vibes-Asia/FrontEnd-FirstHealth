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
import UserInputBox from '../../common/textinputbox/userinputbox';
import UserInputPasswordBox from '../../common/textinputbox/userinputpasswordbox';
import LoginButton from '../../common/Button/loginbutton';
import Logo from '../../common/ImageBox/logo';
import WelcomeBox from '../../common/TittleBox/welcomebox';
import { CustomColors } from '../../utils/common/CustomColors';
import { useDispatch } from 'react-redux';
import { setAuthentication } from '../../store/value';
import { usePostMutation, useGetQuery } from '../../store/api';
import { UrlBase } from '../../utils/common/urlbase';
import ForgotpassBox from '../../common/PickBox/forgotpass';
import { useSelector } from 'react-redux';
import { CustomFonts } from '../../utils/common/CustomFont';
import { CustomDimensions } from '../../utils/common/CustomFont';



const LoginReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function EuctoLoginScreen() {
  const navigation = useNavigation();
  const setRedux = useDispatch();




  const [formState, dispatch] = useReducer(LoginReducer, {
    progressBar: false,
    email: 'anbu.m@eucto.com',
    password: 'Anbu@123',
    eye: true,
  });

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };

  const [loginUser, { data, isLoading, isError, isSuccess, error }] =
    usePostMutation();




  useEffect(() => {
    if (isSuccess) {
      // setRedux(
      //   setAuthentication({
      //     userdata: data,
      //   }),
      // );
    } else if (isError) {
      console.log('Anbu....', JSON.stringify(error));
      Alert.alert(
        JSON.stringify(error?.status),
        JSON.stringify(error?.data?.message),
      );
    }
    handleChange({ progressBar: isLoading });
  }, [data, error]);





  function validation() {
    if (formState.email == '') {
      Alert.alert('Alert', 'Enter a valid email address');
      return;
    }
    if (formState.password == '') {
      Alert.alert('Alert', 'Enter a valid password');
      return;
    }
    handlesignin();
  }

  function handlesignin() {
    handleChange({ progressBar: true });

    loginUser({
      data: {
        email: formState.email,
        password: formState.password,
      },
      url: UrlBase.LOGIN,
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <View style={styles.logocontainer}>
          <Logo
            uri={
              'https://www.eucto.com/wp-content/uploads/2022/08/EUCTO_Logo-1.png'
            }></Logo>
        </View>
        <View style={styles.welcomecontainer}>
          <WelcomeBox txt="Welcome to Eucto Hospital"></WelcomeBox>
        </View>
        <View style={styles.usermailcontainer}>
          <UserInputBox
            hint={'Enter your email'}
            value={formState.email}
            onChangeText={param => {
              handleChange({ email: param });
            }}></UserInputBox>
        </View>
        <View style={styles.passwordcontainer}>
          <UserInputPasswordBox
            hint={'**************'}
            eye={formState.eye}
            value={formState.password}
            onPress={() => {
              handleChange({ eye: !formState.eye });
            }}
            onChangeText={param => {
              handleChange({ password: param });
            }}></UserInputPasswordBox>
        </View>
        <ForgotpassBox txt={"Forgot Password?"} onPress={() => {
          navigation.navigate("getno")
        }}></ForgotpassBox>

        <View style={styles.loginbuttoncontainer}>
          {!formState.progressBar ? (
            <LoginButton value={'Login'} onPress={() => {
              validation()

            }}></LoginButton>
          ) : (
            <ActivityIndicator
              size={'small'}
              color={CustomColors.button_colour}></ActivityIndicator>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    margin: CustomDimensions.mar_20,
    flex: CustomDimensions.flex,
  },
  logocontainer: { marginTop: CustomDimensions.marp_50 },
  welcomecontainer: {
    alignItems: 'center',
    marginTop: CustomDimensions.marp_5,
  },
  usermailcontainer: { marginTop: CustomDimensions.marp_10 },
  loginbuttoncontainer: { marginTop: CustomDimensions.marp_5 },
  passwordcontainer: { marginTop: CustomDimensions.marp_5 },
});
