import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from './CustomStyles';

export default function CustomActionBar({ title, onClick }) {
  return (
    <View style={styles.container}>
     
        <FontAwesome
          name="user-circle"
          size={CustomDimensions.icon_20}
          color={CustomColors.red}
         
          onPress={onClick}></FontAwesome>
   
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C1790',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },

  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});
