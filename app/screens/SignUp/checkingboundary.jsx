import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  Animated,
  Text,
} from "react-native";
import { useEffect, useState, useReducer, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import ActionBar from "../../common/ActionBar/actionbar";
import StepTxt from "../../common/TittleBox/steptxt";
import SignupTitle from "../../common/TittleBox/signuptitle";
import NextFhButton from "../../common/Button/nextfhbutton";
import LabelTitle from "../../common/textbox/labeltitle";
import FhInputBox from "../../common/textinputbox/fhinputbox";
import MapImage from "../../common/ImageBox/mapimage";
import Home from "../../assets/icon/homeicon.svg";
import { useSelector } from "react-redux";
import { usePostMutation } from "../../store/api";
import Progressing from "../../common/Progress/Progressing";
import { UrlBase } from "../../utils/common/urlbase";
import ErrorInfo from "../../common/textbox/errorinfo";
import WhDoubleInputBox from "../../common/textinputbox/whdoubleinputbox";
import WhDoubleDD from "../../common/DropDown/whdoubledd";
import MapView, { Marker, Polyline, Circle } from 'react-native-maps';
import { CustomColors, CustomFontSize, CustomDimensions, CustomFonts } from "../../utils/common/CustomStyles";
import { verticalScale, horizontalScale, moderateScale } from "../../utils/common/Metrics";
import UncoverAlert from "../../common/TittleBox/uncoveralert";
import OutsideAlert from "../../common/AlertBox/outsidealert";
import MailIconButton from "../../common/Button/mailicobutton";
import BackHomeButton from "../../common/Button/backhomebutton";


const PIReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

const { height } = Dimensions.get("window");

export default function CheckingBoundary({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();
  const [isConfigured, setConfigured] = useState(true);

  const [Notify, { data, error }] =
    usePostMutation();



  const [isUpperVisible, setIsUpperVisible] = useState(true);

  // Animation values
  const upperOpacity = useRef(new Animated.Value(0)).current; // Initially hidden (opacity 0)
  const lowerTranslateY = useRef(new Animated.Value(-height / 2)).current;

  const toggleUpperContainer = () => {
    console.log(isUpperVisible, "kbsdasibjd")
    if (isUpperVisible) {
      // Show the upper container
      Animated.timing(upperOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Shrink the lower container back to its original place
      Animated.timing(lowerTranslateY, {
        toValue: 0, // Return to original position
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      // Hide the upper container
      Animated.timing(upperOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Expand the lower container to fill the whole page
      Animated.timing(lowerTranslateY, {
        toValue: -height / 2, // Transition upwards
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    setIsUpperVisible(!isUpperVisible);
  };

  // const [step2, { data, error }] = usePostMutation();

  const reg_id = useSelector((state) => state.operation?.temp_regid);

  const temp_add = useSelector((state) => state.operation?.temp_add);

  console.log(JSON.stringify(temp_add) + "...temp addd....");

  const [formState, dispatch] = useReducer(PIReducer, {
    adds1: "",
    adds2: "",
    pin: "",
    city: "",
    state: "Tamil nadu",
    country: "India",
    val_e: false,
    progressBar: false,
    iscovered: true,
    title: route?.params?.data?.iscovered ? "Your area is covered!" : "Outside of coverage area"
  });

  // useEffect(() => {
  //   handleChange({
  //     adds1: temp_add?.adds1,
  //     adds2: temp_add?.adds2,
  //     pin: temp_add?.pin,
  //     city: temp_add?.city,
  //     state: temp_add?.state,
  //     country: temp_add?.country,
  //   });
  // }, [temp_add]);



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

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  const mapstyle = [
    {
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#5525a5"
        },
        {
          "saturation": -35
        },
        {
          "lightness": 85
        }
      ]
    }
  ]




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
      <ActionBar
        txt={"Registration"}
        progress={2 / 7}
        onPress={() => {
          navigation.goBack()

          // setConfigured(true);
          // toggleUpperContainer();
        }}
      ></ActionBar>

      <View style={{ height: "80%" }}>
        <MapView
          style={{ height: "50%" }}
          customMapStyle={route?.params?.data?.iscovered ? [] : mapstyle}
          initialRegion={{
            latitude: route?.params?.data?.lat,
            longitude: route?.params?.data?.lan,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            draggable
            coordinate={{
              latitude: route?.params?.data?.lat,
              longitude: route?.params?.data?.lan,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }

          />
        </MapView>
        <View style={{}}>
          <View style={{ marginHorizontal: "5%" }}>
            <View style={{ marginTop: "5%" }}>
              {!route?.params?.data?.iscovered &&
                <View style={{ alignSelf: "center", marginBottom: "2%" }}>
                  <OutsideAlert></OutsideAlert>
                </View>
              }
              {route?.params?.data?.iscovered &&
                <StepTxt txt={"STEP 2 of 7"}></StepTxt>
              }
            </View>

            <View style={{ margin: "2%" }}>
              <SignupTitle txt={formState.title}></SignupTitle>
            </View>
            {!route?.params?.data?.iscovered &&
              <View style={{ marginTop: "2%" }}>
                <UncoverAlert txt={"We're sorry, but your address is currently outside our coverage area, so we can't create an account for you right now. However, we'd be happy to notify you by email once your area is supported."}></UncoverAlert>
              </View>
            }

            {route?.params?.data?.iscovered &&
              <View style={{ margin: "2%" }}>
                <LabelTitle title={"Address"} mandatory={false}></LabelTitle>

                <View style={{
                  flexDirection: "row", justifyContent: "flex-start",
                  paddingHorizontal: horizontalScale(10),
                  backgroundColor: CustomColors.add_bg,

                  borderRadius: moderateScale(8),
                  paddingVertical: verticalScale(15),
                }}>
                  <Home width={CustomDimensions.icon_height_30} height={CustomDimensions.icon_height_30}></Home>
                  <Text style={styles.titletxt}>
                    {route.params.data?.fulladdress}
                  </Text>

                </View>
              </View>
            }
          </View>



        </View>

      </View>




      <>
        {!route?.params?.data?.iscovered ?
          <View style={styles.buttoncontainer}>
            {!formState.progressBar ?
              <MailIconButton value={"Yes, email me "} onPress={handlenotify}></MailIconButton>
              :
              <Progressing></Progressing>
            }
            <View style={{ marginHorizontal: horizontalScale(10) }}>
              <BackHomeButton value={"Back to Home"} onPress={() => {
                navigation.navigate("start")
              }}></BackHomeButton>
            </View>
          </View>
          :

          <NextFhButton
            value={"Next,create your account"}
            onPress={() => {
              navigation.navigate("sp")
              // validation();
            }}
          ></NextFhButton>


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
    marginTop: "5%",
  },
  subtxtcontainer: {
    marginHorizontal: "10%",
  },
  lowerContainer: {
    height: height / 2,
    width: "100%",
  },
  titletxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    // marginBottom: verticalScale(10),
    lineHeight: verticalScale(18),
    marginLeft: horizontalScale(15),
    width: "80%",

  },
  buttoncontainer:
    { position: "absolute", bottom: 0, width: "100%" }
});
