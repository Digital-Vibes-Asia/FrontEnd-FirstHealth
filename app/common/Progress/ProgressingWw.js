import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';


export default function ProgressingWw({color}) {
  console.log(JSON.stringify(color)+" What is the Colour...")
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size={"small"}></ActivityIndicator>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", alignItems: 'center', flex: 1,
  

  }
});
