import { View, StyleSheet, ScrollView, Alert, Dimensions, PermissionsAndroid, Platform, } from 'react-native';
import { useEffect, useState, useReducer, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { UrlBase } from '../../utils/common/urlbase';
import { usePostMutation } from '../../store/api';
import MapView, { Marker, Polyline, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import CallButton from '../../common/Button/callbutton';
import { horizontalScale, verticalScale } from '../../utils/common/Metrics';

import AreYouSureButton from '../../common/Button/areyousurebutton';
import FocusButton from '../../common/Button/focusbutton';
import ScheduledCard from '../../common/Card/scheduledCard';








const SPReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();
  const GOOGLE_PLACES_API_KEY = 'AIzaSyB0pWBVeA3Up7VSeKkykdz23gT2aAqhso4';

  const mapRef = useRef(null);

  const center = { latitude: 13.085463093767865, longitude: 80.18241410864904 };
  const radius = 10000; // Radius in meters (15 km)








  useEffect(() => {
    const checkLocationServices = () => {
      Geolocation.getCurrentPosition(
        (position) => {

          const { latitude, longitude } = position.coords;

        },
        (error) => {
          navigation.navigate("gps")

          console.log(JSON.stringify(error) + " Error....")


        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Location permission denied');
          return;
        }
      }
      checkLocationServices();
    };

    requestLocationPermission();
  }, []);










  const [sp, { data, error }] = usePostMutation();

  const [formState, dispatch] = useReducer(SPReducer, {
    sure: false,
    location: {
      latitude: 13.085463093767865,
      longitude: 80.18241410864904,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    }

  });

  const handleFocus = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(formState.location, 1000); // Focus on the location over 1 second
    }
  };



  console.log(JSON.stringify(formState.location) + " Location....")

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };



  function validation() {

    if (formState.mail == "") {
      handleChange({ mail_e: true });
    } else {
      handleChange({ mail_e: false });
    }

    if (formState.pass == "") {
      handleChange({ pass_e: true });
    } else {
      handleChange({ pass_e: false });
    }



    if (formState.mail != "" && formState.pass != "") {
      handleChange({ progressBar: true });
      sp({
        data: {
          password: formState.pass,
          // id: reg_id,
          email: formState.mail,
        },
        url: UrlBase.SIGNIN,
      });
    }




    // if (!regex.test(formState.pass)) {
    //   if (!uppercase.test(formState.pass)) {
    //     handleChange({
    //       pass_e: true,
    //       desc1: 'Password must include at least one uppercase letter',
    //     });
    //     return;
    //   }
    //   if (!lowercase.test(formState.pass)) {
    //     handleChange({
    //       pass_e: true,
    //       desc1: 'Password must include at least one lowercase letter',
    //     });
    //     return;
    //   }
    //   if (!number.test(formState.pass)) {
    //     handleChange({
    //       pass_e: true,
    //       desc1: 'Password must include at least one number',
    //     });
    //     return;
    //   }
    //   if (!specialChar.test(formState.pass)) {
    //     handleChange({
    //       pass_e: true,
    //       desc1: 'Password must include at least one special character',
    //     });
    //     return;
    //   }

    //   if (!minLength.test(formState.pass)) {
    //     handleChange({
    //       pass_e: true,
    //       desc1: 'Password must be at least 12 characters long',
    //     });
    //     return;
    //   }
    // } else {
    // if (formState.mail != '' && formState.pass == formState.setpass) {


    // } else {
    //   handleChange({
    //     setpass_e: true,
    //     desc2: 'Password does not match',
    //     pass_e: false,
    //   });
    // }
    // }
  }

  const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];





  return (
    <>
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details) => {
          console.log(data, details, "Anboooooooo");
        }}
        query={{
          key: 'AIzaSyB0pWBVeA3Up7VSeKkykdz23gT2aAqhso4', // Replace with your API key
          language: 'en',
        }}
        styles={{
          textInputContainer: {
            width: '100%',
            color: "#000"
          },
          textInput: {
            height: 38,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,

          },
          listView: {
            backgroundColor: 'green',
            elevation: 2,
            color: "#000"
          },

        }}
      /> */}

      <View style={styles.container}>

        <MapView
          style={styles.mapStyle}
          ref={mapRef}
          initialRegion={formState.location}
        >
          <Marker
            draggable
            coordinate={{
              latitude: 13.085463093767865,
              longitude: 80.18241410864904,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'First Health'}
            description={'First Health'}
          />
          {/* <Circle


            center={center}
            radius={radius}
            strokeColor="#5525A5"
            fillColor="rgba(0, 0, 0, 0)"
            lineDashPattern={[200, 12]}
            strokeWidth={4}

          /> */}
          <Circle
            center={center}
            radius={radius}
            strokeColor="#5525A5" // Light color to contrast shadow
            fillColor="rgba(85, 37, 165, 0.3)"
            zIndex={2} // Render on top of the shadow
          />
        </MapView>


        <View style={{ position: "absolute", bottom: verticalScale(15), width: "100%" }}>
          <View style={{ alignItems: "flex-end", marginRight: horizontalScale(20), marginBottom: verticalScale(10) }}>
            <FocusButton onPress={() => {
              handleFocus()
            }}></FocusButton>

          </View>
          {true &&

            <ScheduledCard onPress={() => {
              navigation.navigate("dir")

            }}></ScheduledCard>
          }

        </View>

      </View>


      <View style={{ paddingVertical: verticalScale(10) }}>

        {!formState.sure ?
          <CallButton value={"Call Ambulance"} onPress={() => {
            handleChange({ sure: true })
          }}></CallButton>
          : <AreYouSureButton onPress={() => {
            handleChange({ sure: false })
          }} onPress2={() => {
            handleChange({ sure: false })
            navigation.navigate("chs")

          }}></AreYouSureButton>
        }
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
