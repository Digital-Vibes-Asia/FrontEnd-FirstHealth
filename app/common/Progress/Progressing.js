import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { CustomColors } from '../../utils/common/CustomStyles';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';


export default function Progressing() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={CustomColors.theme_clr} size={"small"}></ActivityIndicator>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", alignItems: 'center', flex: 1,
    backgroundColor: '#fff',
    marginBottom:verticalScale(10),

  }
});
