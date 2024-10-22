import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { ActivityIndicator } from 'react-native';

export default function HomeProgress({ txt }) {
  return (
    <View style={styles.nodatafoundcontainer}>
     <ActivityIndicator size={"small"}></ActivityIndicator>
    </View>
  );
}

const styles = StyleSheet.create({
 
  nodatafoundcontainer: { height: 100, borderRadius: 10, borderWidth: 1, borderColor: CustomColors.bordercolour, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }
});
