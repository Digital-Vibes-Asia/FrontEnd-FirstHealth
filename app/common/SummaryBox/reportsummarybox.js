import {StyleSheet, Pressable, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ReportSummaryBox({
  onChangeText,
  txt1,
  txt2,
  txt3,
  date,
}) {
  return (
    <Pressable style={styles.container} onPress={onChangeText}>
      <View>
        <Text style={styles.normaltextstyle}>{txt1}</Text>
        <Text style={styles.normaltextstyle}>{txt2}</Text>
        <Text style={styles.normaltextstyle}>{txt3}</Text>
        <Text style={styles.boldtextstyle}>{date}</Text>
      </View>
      <View style={styles.txtcontainer}>
        <FontAwesome
          style={styles.iconstyle}
          name="arrow-circle-down"
          size={40}
          color={CustomColors.button_colour}></FontAwesome>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: CustomColors.bordercolour,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  normaltextstyle: {
    color: CustomColors.textcolour,
    fontSize: 12,
    fontWeight: 'normal',
    paddingBottom: 2,
  },
});
