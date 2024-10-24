import { View, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { useEffect, useState, useReducer, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { UrlBase } from '../../utils/common/urlbase';
import Progressing from '../../common/Progress/Progressing';
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
import MapViewDirections from 'react-native-maps-directions';
import { CustomColors } from '../../utils/common/CustomStyles';
import Ambulance from "../../assets/icon/ambulancepin.svg"
import Userpin from "../../assets/icon/userpin.svg"
import { CustomDimensions, CustomFontSize } from '../../utils/common/CustomStyles';
import {GOOGLE_API_KEY} from "@env";
import AmbulanceCard from '../common/Card/ambulancecard';




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
  const GOOGLE_PLACES_API_KEY = 'AIzaSyB0pWBVeA3Up7VSeKkykdz23gT2aAqhso4';
  const mapRef = useRef(null);


  const center = { latitude: 13.085463093767865, longitude: 80.18241410864904 };
  const radius = 10000; // Radius in meters (15 km)


  const [formState, dispatch] = useReducer(SPReducer, {
    sure: false,
    arr_time: "",
  });

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };

  const origin = { latitude: 13.085463093767865, longitude: 80.18241410864904 };
  const destination = { latitude: 13.075947149654187, longitude: 80.19585996648415 };


  useEffect(() => {
    if (mapRef.current) {
      // Fit the map to the marker coordinates
      mapRef.current.fitToCoordinates([origin, destination], {
        edgePadding: {
          top: -50,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }
  }, [origin, destination]);


  const calculateArrivalTime = (durationInMinutes) => {
    const now = new Date();
    const arrivalDate = new Date(now.getTime() + durationInMinutes * 60 * 1000); // Convert minutes to milliseconds
    return arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };




  return (
    <>
      <RouteActionBar txt={formState.arr_time} txt2={"Your Ambulance is on the way"}></RouteActionBar>

      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.mapStyle}
          initialRegion={{
            latitude: 13.085463093767865,
            longitude: 80.18241410864904,
            latitudeDelta: 0.018,
            longitudeDelta: 0.018,
          }}
        >
          <Marker
            coordinate={origin}
          >
            <Userpin width={CustomDimensions.icon_width_30}
              height={CustomDimensions.icon_height_30}></Userpin>

          </Marker>
          <Marker
            coordinate={destination}
          >
            <Ambulance width={CustomDimensions.icon_width_30}
              height={CustomDimensions.icon_height_30}></Ambulance>

          </Marker>

          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
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
        <View style={{ position: "absolute", bottom: 10, }}>
          <View style={{ marginHorizontal: horizontalScale(20) }}>
            <AmbulanceCard txt={"khairul ismayil"} txt2={"HWD 8878"} emergency={true} ></AmbulanceCard>
          </View>
        </View>

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

  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
