
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import LocationPicker from './locationpicker';
import { usePostMutation } from '../../store/api';
import { useNavigation } from '@react-navigation/native';
import { useReducer } from 'react';
import { UrlBase } from '../../utils/common/urlbase';
import Geocoder from 'react-native-geocoding';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

Geocoder.init('AIzaSyB0pWBVeA3Up7VSeKkykdz23gT2aAqhso4');


const PIReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, ...action.fields };
        default:
            return state;
    }
};



const Address = () => {
    const navigation = useNavigation();

    const [formState, dispatch] = useReducer(PIReducer, {
        adds1: "1",
        adds2: "2",
        pin: "600000",
        city: "Chennai",
        state: "Chennai",
        country: "Tamilnadu",
        val_e: false,
        progressBar: false,
        iscovered: true,
        lat: "",
        lan: "",
        fulladdress: "",
    });

    const reg_id = useSelector(
        state => state.operation?.temp_regid,
    );

    console.log(formState.lat + 'Latitude...')

    const handleChange = fields => {
        dispatch({ type: 'SET_FIELD', fields });
    };

    const [step2, { data, error }] =
        usePostMutation();

    const [check, { data: checkdata, error: checkerror }] =
        usePostMutation();


    const getAddress = async (latitude, longitude) => {
        try {
            const response = await Geocoder.from(latitude, longitude);

            const address = response.results[0].formatted_address;

            console.l
            // const addressComponents = response.results[0].address_components;
            // let add1 = '';
            // let add2 = '';
            // let city = '';
            // let state = '';
            // let pin = '';
            // let country = '';

            // console.log(JSON.stringify(response) + " Resposnes...")

            // addressComponents.forEach(component => {
            //     const types = component.types;

            //     if (types.includes("street_number")) {
            //         add1 = component.long_name; // Street number
            //     } else if (types.includes("route")) {
            //         add2 = component.long_name; // Street name
            //     } else if (types.includes("locality") || types.includes("sublocality")) {
            //         add2 = component.long_name; // City
            //     } else if (types.includes("administrative_area_level_1")) {
            //         state = component.long_name; // State
            //     } else if (types.includes("postal_code")) {
            //         pin = component.long_name; // Postal code
            //     } else if (types.includes("country")) {
            //         country = component.long_name; // Country
            //     }
            // });

            // console.log(add1, add2, state, pin, country + " Resposnes...")




            handleChange({
                fulladdress: address,
            })

            console.log({
                latitude: latitude,
                longitude: longitude,
            } + " WHat is happening here....")

            check({
                data: {
                    latitude: latitude,
                    longitude: longitude,
                },
                url: UrlBase.CHECK_COVER,
            })

            console.log(`Address: ${address}`);
            // Alert.alert("Address", address)


        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (checkdata) {
            console.log(JSON.stringify(checkdata, checkerror) + "...Check Data....")
            if (checkdata?.is_covered) {
                handleChange({ iscovered: true })

                insertaddress(checkdata?.is_covered)


                // navigation.navigate("cb", {
                //     data: formState
                // })
            }
            else {
                insertaddress(checkdata?.is_covered)
                handleChange({ iscovered: false })
                // navigation.navigate("ua", {
                //     data: formState
                // })

            }


        }
        else if (checkerror) {
            Alert.alert(
                JSON.stringify(error?.status),
                JSON.stringify(error?.data?.message),
            );
        }


    }, [checkdata, checkerror]);


    function insertaddress(iscover) {

        console.log(JSON.stringify({
            address: formState.fulladdress,
            latitude: formState.lat,
            longitude: formState.lan,
            // address2: formState.adds2,
            // postcode: formState.pin,
            // city: formState.city,
            // state: formState.state,
            // country: formState.country,
            id: reg_id,
            is_covered: iscover
        }) + " Insert....")


        step2({
            data: {
                address: formState.fulladdress,
                latitude: formState.lat,
                longitude: formState.lan,
                // address2: formState.adds2,
                // postcode: formState.pin,
                // city: formState.city,
                // state: formState.state,
                // country: formState.country,
                id: reg_id,
                is_covered: iscover
            },
            url: UrlBase.STEP2,
        });

    }


    useEffect(() => {
        if (data) {

            navigation.navigate("cb", {
                data: formState
            })

            console.log(JSON.stringify(formState) + "Formstate is what....")



        }
        else if (error) {
            Alert.alert(
                JSON.stringify(error?.status),
                JSON.stringify(error?.data?.message),
            );
        }
        handleChange({ progressBar: false });

    }, [data, error]);



    const handleLocationSelect = (location) => {

        const { latitude, longitude } = location?.coordinate

        console.log(latitude, longitude, "Place Details...")

        handleChange({
            lat: latitude,
            lan: longitude,
        })


        console.log('Selected Location:', location);
    };

    return (
        <View style={styles.container}>
            <LocationPicker onLocationSelect={handleLocationSelect} next={() => {
                getAddress(formState.lat, formState.lan)
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height:"100%",
        justifyContent: 'center',
        // padding: 20,
    },
});

export default Address;
