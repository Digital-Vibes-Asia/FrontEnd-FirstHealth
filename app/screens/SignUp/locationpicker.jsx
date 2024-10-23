// LocationPicker.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { verticalScale, horizontalScale, moderateScale } from '../../utils/common/Metrics';
import { CustomDimensions, CustomColors, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import { Input } from 'react-native-elements';
import CheckCoverageButton from '../../common/Button/checkcoveragebutton';
import RegisterButton from '../../common/Button/registerbutton';
import ActionBar from '../../common/ActionBar/actionbar';
import { useNavigation } from '@react-navigation/native';



const LocationPicker = ({ onLocationSelect, next }) => {
    const navigation = useNavigation()
    const ref = useRef();
    const [isFocused, setIsFocused] = useState(false);

    const [location, setLocation] = useState(null);
    const [Inputvalue, setInputValue] = useState("");
    const [mapRegion, setMapRegion] = useState({
        latitude: 13.0844471, // Default to some location
        longitude: 80.18047179999999,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });






    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                } else {
                    Alert.alert('Permission denied', 'Location permission is required to use this feature.');
                }
            } else {
                getCurrentLocation();
            }
        };

        requestLocationPermission();
    }, []);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition((info) => {
            const { latitude, longitude } = info.coords;
            const initialRegion = {
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            setMapRegion(initialRegion);
            setLocation({ description: 'Current Location', coordinate: { latitude, longitude } });
            onLocationSelect({ description: 'Current Location', coordinate: { latitude, longitude } });

            console.log(JSON.stringify(info) + "ANbooooo")
        }

        );


        // Geolocation.getCurrentPosition(
        //     (position) => {
        //         const { latitude, longitude } = position.coords;
        //         const initialRegion = {
        //             latitude,
        //             longitude,
        //             latitudeDelta: 0.0922,
        //             longitudeDelta: 0.0421,
        //         };
        //         console.log(JSON.stringify(initialRegion) + " Current Location...")
        //         setMapRegion(initialRegion);
        //         setLocation({ description: 'Current Location', coordinate: { latitude, longitude } });
        //         onLocationSelect({ description: 'Current Location', coordinate: { latitude, longitude } });
        //     },
        //     (error) => {
        //         Alert.alert('Error', 'Unable to retrieve location');
        //         console.error(error);
        //     },
        //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        // );
    };

    const handleRegionChangeComplete = (region) => {
        setMapRegion(region);
        setLocation({ description: 'Custom Location', coordinate: { latitude: region.latitude, longitude: region.longitude } });
        onLocationSelect({ description: 'Custom Location', coordinate: { latitude: region.latitude, longitude: region.longitude } });
    };






    const handleMapPress = (e) => {
        const { coordinate } = e.nativeEvent;
        setMapRegion({
            ...mapRegion,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
        setLocation({ description: 'Custom Location', coordinate });
        onLocationSelect({ description: 'Custom Location', coordinate });
    };

    return (
        <View style={styles.container}>

            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    region={mapRegion}
                    onPress={handleMapPress}
                >
                    {location && (
                        <Marker coordinate={location.coordinate} title={location.description} />
                    )}

                </MapView>
            </View>
            <View style={{ position: "absolute", width: "100%", }}>
                <ActionBar txt={"Registration"} progress={2 / 7} onPress={() => {
                    navigation.goBack()
                }}></ActionBar>
            </View>
            {/* <View style={{ position: "absolute", top: "2%", width: "95%", marginHorizontal: "2.5%", }}>
                <GooglePlacesAutocomplete
                    autoFillOnNotFound={true}
                    textInputProps={{
                        placeholderTextColor: CustomColors.neutral_400,
                        returnKeyType: "search"
                    }}
                    onRegionChangeComplete={handleRegionChangeComplete}
                    placeholder='Enter your address'
                    onPress={(data, details = null) => {
                        const { lat, lng } = details.geometry.location;
                        const selectedLocation = { description: data.description, coordinate: { latitude: lat, longitude: lng } };
                        setLocation(selectedLocation);
                        setMapRegion({ ...mapRegion, latitude: lat, longitude: lng });
                        onLocationSelect(selectedLocation);
                    }}
                    query={{
                        key: 'AIzaSyB0pWBVeA3Up7VSeKkykdz23gT2aAqhso4', // Replace with your API Key
                        language: 'en',
                        // components: 'country:my',
                    }}
                    styles={{
                        textInputContainer: styles.textInputContainer,
                        textInput: styles.textinput,
                        listView: styles.listView,
                        row: styles.row,
                        description: {
                            color: CustomColors.neutral_700
                        }
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={200}
                    placeholderTextColor="red" // Set placeholder text color

                // Custom render for list items

                />

            </View> */}


            <View style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: CustomColors.white }}>
                <View style={{ marginHorizontal: horizontalScale(10), marginTop: verticalScale(20) }}>
                    <GooglePlacesAutocomplete
                        ref={ref}
                        autoFillOnNotFound={true}
                        textInputProps={{
                            placeholderTextColor: CustomColors.neutral_400,
                            returnKeyType: "search",
                            onChangeText: (text) => {
                                setInputValue(text); // Update the state with the new text
                                console.log('Text input changed:', text); // Debugging: log the text changes
                            },
                            onFocus: () => setIsFocused(true), // Handle focus event
                            onBlur: () => setIsFocused(false),


                        }}
                        onRegionChangeComplete={handleRegionChangeComplete}
                        placeholder='Enter your address'
                        onPress={(data, details = null) => {
                            const { lat, lng } = details.geometry.location;
                            const selectedLocation = { description: data.description, coordinate: { latitude: lat, longitude: lng } };
                            setLocation(selectedLocation);
                            setMapRegion({ ...mapRegion, latitude: lat, longitude: lng });
                            onLocationSelect(selectedLocation);
                        }}

                        query={{
                            key: 'AIzaSyB0pWBVeA3Up7VSeKkykdz23gT2aAqhso4', // Replace with your API Key
                            language: 'en',
                            // components: 'country:my',
                        }}
                        // styles={{
                        //     textInputContainer: styles.textInputContainer,
                        //     textInput: styles.textinput,
                        //     listView: styles.listView,
                        //     row: styles.row,
                        //     description: {
                        //         color: CustomColors.neutral_700
                        //     }
                        // }}
                        // styles={{
                        //     textInputContainer: {
                        //         width: '100%',
                        //         backgroundColor: 'white',
                        //         borderTopWidth: 0,
                        //         borderBottomWidth: 0,
                        //     },
                        //     textInput: {
                        //         height: 40,
                        //         color: CustomColors.neutral_700,
                        //         fontSize: 16,
                        //         borderWidth: 1,
                        //         borderColor: '#ddd',
                        //         borderRadius: 5,
                        //         paddingHorizontal: 10,
                        //     },
                        //     listView: {
                        //         position: 'absolute',
                        //         zIndex: 1,
                        //         backgroundColor: 'white',
                        //         width: '100%',
                        //         borderWidth: 1,
                        //         borderColor: '#ddd',
                        //         flexDirection: 'column-reverse', // Reverses the list order
                        //         top: -200, // Adjust this based on how far up you want the dropdown to appear
                        //     },
                        //     row: {
                        //         padding: 13,
                        //         height: 44,
                        //         flexDirection: 'row',
                        //         borderColor: '#ddd',
                        //         borderBottomWidth: 1,
                        //     },
                        //     description: {
                        //         color: CustomColors.neutral_700,
                        //     },
                        //     separator: {
                        //         height: 0.5,
                        //         backgroundColor: '#c8c7cc',
                        //     }
                        // }}
                        styles={{
                            textInputContainer: [styles.textInputContainer, { borderColor: isFocused ? CustomColors.new_theme_clr :CustomColors.neutral_200, }],
                            textInput: styles.textinput,
                            listView: {
                                ...styles.listView,
                                position: 'absolute',
                                bottom: verticalScale(60), // Position the list at the bottom
                                top: 'auto', // Ensure the top is not set
                                transform: [{ scaleY: -1 }] // Flip the list upside down
                            },

                            row: {
                                ...styles.row,
                                transform: [{ scaleY: -1 }] // Flip the rows back to normal
                            },
                            description: {
                                color: CustomColors.neutral_700,
                            },
                        }}
                        // renderRow={(data,index)=>{
                        //     console.log(JSON.stringify(data)+" Data....")
                        // }}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={200}

                    />

                </View>
                <CheckCoverageButton location={Inputvalue} value={"Check my coverage area"} onPress={next}></CheckCoverageButton>
            </View>

            {location && (
                <Text style={styles.selectedLocation}>
                    Selected Location: {location.description}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInputContainer: {
        // backgroundColor: 'green',
        justifyContent: "center",
        alignItems: "center",
        // alignSelf: "center",
        borderWidth: moderateScale(1),
        paddingLeft: horizontalScale(10),
        paddingRight: horizontalScale(10),
        // paddingVertical: verticalScale(5),
        borderRadius: moderateScale(8),
        borderColor: CustomColors.neutral_200,
        marginBottom: verticalScale(10)



    },
    // textInput: {
    //     height: 40,
    //     borderRadius: 5,
    //     paddingHorizontal: 10,
    // },
    listView: {
        // position: 'absolute',
        top: -100, // Adjust this to position the list above the text input
        left: 0,
        right: 0,
        zIndex: 1, // 
        backgroundColor: 'white',
        color: CustomColors.neutral_700,
    },
    mapContainer: {
        overflow: 'hidden',

        // Prevent map overflow
    },
    map: {
        width: '100%',
        height: '100%',


        // Make sure the map takes full height of the container
    },
    selectedLocation: {
        marginTop: 20,
        fontSize: 16,
    },
    textinput: {

        color: CustomColors.neutral_800,

        fontSize: CustomFontSize.normal,
        fontFamily: CustomFonts.PoppinsRegular,

        placeholderTextColor: "red"
    },
    row: {
        backgroundColor: "#fff", // Background color for each row
    },
});




export default LocationPicker;
