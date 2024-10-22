import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';

export default function Dssingle({txt1, txt2}) {
  return (
    <View style={styles.container}>
      <Text style={styles.normaltextstyle}>{txt1}</Text>
      <Text style={styles.boldtextstyle}>{txt2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '70%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom:10,
  },
  boldtextstyle: {
    // width: '60%',
    color: CustomColors.textcolour,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  normaltextstyle: {
    width: '30%',
    color: CustomColors.textcolour,
    fontSize: 14,
    fontWeight: 'normal',
    justifyContent: 'flex-start',
  },
});
