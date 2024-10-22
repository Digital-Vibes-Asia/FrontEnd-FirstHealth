import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Example = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>First Line</Text>
      <Text style={styles.text}>Second Line</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 0,
    padding: 0,
   
    textAlignVertical: 'center', // Android specific
  },
});

export default Example;
