import { View, StyleSheet, ScrollView, Alert, Dimensions, Pressable } from 'react-native';
import { useEffect, useState, useReducer, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { UrlBase } from '../../utils/common/urlbase';
import { usePostMutation } from '../../store/api';
import { setAuthentication, settemp_regid, setUsername } from '../../store/value';
import MapView, { Marker, Polyline, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import NextFhButton from '../../common/Button/nextfhbutton';
import CallButton from '../../common/Button/callbutton';
import { horizontalScale, verticalScale } from '../../utils/common/Metrics';
import AreYouSureButton from '../../common/Button/areyousurebutton';
import RouteActionBar from '../../common/ActionBar/routeaction';
import AmbulanceCard from '../../common/Card/ambulancecard';
import MapViewDirections from 'react-native-maps-directions';
import { CustomColors } from '../../utils/common/CustomStyles';
import Ambulance from "../../assets/icon/ambulancepin.svg"
import Userpin from "../../assets/icon/userpin.svg"
import { CustomDimensions, CustomFontSize } from '../../utils/common/CustomStyles';
import AAActionBar from '../../common/ActionBar/aaactionbar';
import FocusButton from '../../common/Button/focusbutton';
import CancelAmbulance from '../../common/Dialogs/cancelAmbulance';
import ScheduleAmbulanceBox from '../../common/ActionBar/scheduleAmbulanceBox';
import PatientDetailsCard from '../../common/Card/patientDetailsCard';

import Focus from "../../assets/icon/focusicon.svg"


const { width, height } = Dimensions.get('window');




const SPReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function DirectionScreen({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();
  const mapRef = useRef(null);





  const [formState, dispatch] = useReducer(SPReducer, {
    sure: false,
    arr_time: "",
    origin: {
      latitude: 13.085463093767865, longitude: 80.18241410864904, latitudeDelta: 0.018,
      longitudeDelta: 0.018,
    },
    destination: {
      latitude: 13.075947149654187, longitude: 80.19585996648415, latitudeDelta: 0.018,
      longitudeDelta: 0.018,
    },
    canceldialog: false

  });

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };




  useEffect(() => {
    if (mapRef.current) {
      // Fit the map to the marker coordinates
      mapRef.current.fitToCoordinates([formState.origin, formState.destination], {
        edgePadding: {
          top: 0,
          right: 25,
          bottom: height / 2,
          left: 50,
        },
        animated: true,
      });
    }
  }, [formState.origin, formState.destination]);


  const calculateArrivalTime = (durationInMinutes) => {
    const now = new Date();
    const arrivalDate = new Date(now.getTime() + durationInMinutes * 60 * 1000); // Convert minutes to milliseconds
    return arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };




  return (
    <>
      {/* <RouteActionBar txt={formState.arr_time} txt2={"Your Ambulance is on the way"}></RouteActionBar> */}
      {/* <AAActionBar></AAActionBar> */}
      <ScheduleAmbulanceBox onPress={() => {
        navigation.goBack()
      }}></ScheduleAmbulanceBox>

      <View style={styles.container}>
        <View style={styles.mapStyle}>
          <MapView
            ref={mapRef}
            style={{ height: "100%" }}
            initialRegion={formState.origin}
          >
            <Marker
              coordinate={formState.origin}
            >
              <Userpin width={CustomDimensions.icon_width_30}
                height={CustomDimensions.icon_height_30}></Userpin>

            </Marker>
            <Marker
              coordinate={formState.destination}
            >
              <Ambulance width={CustomDimensions.icon_width_30}
                height={CustomDimensions.icon_height_30}></Ambulance>

            </Marker>

            <MapViewDirections
              origin={formState.origin}
              mode={"DRIVING"}
              destination={formState.destination}
              apikey={"AIzaSyB0pWBVeA3Up7VSeKkykdz23gT2aAqhso4"}
              strokeWidth={3}
              onReady={(result) => {
                handleChange({ arr_time: calculateArrivalTime(result?.duration) })
                console.log(result?.duration + "...Results....")
                console.log(calculateArrivalTime(result?.duration) + "...Results....")
              }}
              onError={(errorMessage) => {
                console.log(errorMessage);
              }}

              strokeColor={CustomColors.new_theme_clr}
            />

          </MapView>
          {/* <View style={{ position: "absolute", top: 0, width: "100%" }}>
            <PatientDetailsCard></PatientDetailsCard>
          </View> */}



        </View>


        <View style={{ position: "absolute", bottom: verticalScale(10), }}>
          <View style={{ alignItems: "flex-end", marginRight: horizontalScale(10), marginBottom: verticalScale(10) }}>

            <FocusButton onPress={() => {

              handleChange({
                origin: {
                  latitude: 13.085463093767865, longitude: 80.18241410864904, latitudeDelta: 0.018,
                  longitudeDelta: 0.018,
                },
                destination: {
                  latitude: 13.075947149654187, longitude: 80.19585996648415, latitudeDelta: 0.018,
                  longitudeDelta: 0.018,
                }
              })



            }}>

            </FocusButton>

          </View>
          <View style={{ marginHorizontal: horizontalScale(20) }}>
            <AmbulanceCard txt={"khairul ismayil"} emergency={false} txt2={"HWD 8878"} cancel={() => {
              handleChange({ canceldialog: true })

            }} ></AmbulanceCard>
          </View>
        </View>

      </View>

      <CancelAmbulance dialog={formState.canceldialog} onyes={() => {
        handleChange({ canceldialog: false })

        navigation.navigate("cs")


      }}

        onno={() => {
          handleChange({ canceldialog: false })

        }}

      ></CancelAmbulance>



    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.white

  },

  alertcontainer: { marginTop: '10%', marginHorizontal: '5%' },
  logocontainer: { marginTop: '10%' },
  margin_5: {
    marginTop: '5%',
  },
  subtxtcontainer: {
    marginHorizontal: '10%',
  },

  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
  },
  autocomplete: {
    container: {
      flex: 0,
    },
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 8,
    },
  },


});
