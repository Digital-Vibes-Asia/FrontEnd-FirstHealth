import {
  View,
  StyleSheet,
  Platform,
  ImageBackground,
  Linking
} from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AlertBox from '../../common/AlertBox/alertbox';
import StartingPageTxt from '../../common/TittleBox/startingpagetxt';
import SigninButton from '../../common/Button/signinbutton';
import RegisterButton from '../../common/Button/registerbutton';
import CarouselBox from '../../common/ActionBox/carouselbox';
import { CustomColors } from '../../utils/common/CustomStyles';
import AppLogo from "../../assets/icon/firsthealthlogo.svg"
const image = { uri: require("../../assets/images/background.png") };

import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';


const StartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function StartScreen() {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  


  const [formState, dispatch] = useReducer(StartReducer, {
    caroseldata: [
      {
        id: 1,
        selected: true,
      },
      {
        id: 2,
        selected: false,
      },
      {
        id: 3,
        selected: false,
      },
      {
        id: 4,
        selected: false,
      },
      {
        id: 5,
        selected: false,
      },
    ]

  });

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };

  function moveforward() {
    const selectedItem = formState.caroseldata.find(item => item.selected);
    let mactive = formState.caroseldata.map((item, index, array) => {
      if (selectedItem.id != 1) {
        if (selectedItem.id - 1 == item.id) {
          item.selected = true
        }
        else {
          item.selected = false
        }
      }
      return item
    });

    handleChange({ caroseldata: mactive })
  }

  function movebackward() {
    const selectedItem = formState.caroseldata.find(item => item.selected);
    let mactive = formState.caroseldata.map((item, index) => {
      if (selectedItem.id != 5) {
        if (selectedItem.id + 1 == item.id) {
          item.selected = true
        }
        else {
          item.selected = false
        }
      }
      return item
    });

    handleChange({ caroseldata: mactive })
  }

  return (
    <>
      <ImageBackground opacity={0.5} style={styles.image_container} source={require("../../assets/images/background.png")} resizeMode="cover" >
        <View style={styles.alertcontainer}>
          <AlertBox onPress={() => {
            console.log("Anbooo")
          }}></AlertBox>
        </View>
        <View style={{ position: 'absolute', bottom: 0, width: "100%" }}>


          <View style={styles.logocontainer}>
            <AppLogo width={horizontalScale(130)} height={verticalScale(50)}  ></AppLogo>
            <View style={styles.subtxtcontainer}>
              <StartingPageTxt txt={"A subscription-based private ambulance service that ensures swift, personalized assistance in 15 minutes or less"}></StartingPageTxt>
            </View>
            <View style={styles.margin_5}>
              <CarouselBox onPress1={moveforward} onPress2={movebackward} data={formState.caroseldata}></CarouselBox>
            </View>
          </View>
          <>
            <RegisterButton value={"Register Now"} onPress={() => {
              navigation.navigate("pi")
            }}></RegisterButton>

            <SigninButton value={"Sign in"} onPress={() => {
             navigation.navigate("login")
            }}></SigninButton>

          </>

        </View>



      </ImageBackground>



    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,

  },
  alertcontainer: { marginTop: "10%", marginHorizontal: "5%" },

  margin_5: {
    marginTop: "5%",
    marginBottom: "5%",
  },
  subtxtcontainer: {
    marginTop: "5%",

  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  image_container: { flex: 1, backgroundColor: CustomColors.background_clr, },
  logocontainer: {
    marginLeft: "5%"
  }



});
