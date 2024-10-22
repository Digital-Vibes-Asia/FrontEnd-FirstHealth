import {Image, StyleSheet, Pressable, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import AppoinmentImage from '../ImageBox/logo';
import ReportImage from '../ImageBox/reportimage';

export default function ReportBox({onChangeText, uri, title}) {
  return (
    <Pressable style={styles.container} onPress={onChangeText}>
      <ReportImage uri={uri}></ReportImage>
      <View style={styles.txtcontainer}>
        <Text style={styles.boldtextstyle}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.bordercolour,
    height: 150,
    width: 160,
    borderRadius: 10,
  },
  txtcontainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
