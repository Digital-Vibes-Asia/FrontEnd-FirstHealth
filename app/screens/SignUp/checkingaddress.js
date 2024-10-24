import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from "@env";

const CheckingAddress = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <View style={styles.container}>
      {selectedPlace && (
        <View style={styles.resultContainer}>
          <Text>{selectedPlace.description}</Text>
        </View>
      )}

      <GooglePlacesAutocomplete
        placeholder='Search'
        numberOfLines={3}
        onPress={(data, details = null) => {
          setSelectedPlace(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        styles={{
          container: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          },
          textInputContainer: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            elevation: 5, // Optional shadow effect
          },
          textInput: {
            height: 50,
            color: '#5d5d5d',
            fontSize: 16,
          },
          listView: {
            position: 'absolute',
            top: -300, // Adjust to fit above input
            zIndex: 2,
          },
          row: {
            backgroundColor: 'white',
            padding: 10,
            height: 58,
          },
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 70, // Adjust based on your design
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
});

export default CheckingAddress;
