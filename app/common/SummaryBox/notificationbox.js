import { Image, StyleSheet, Pressable, Text, View } from 'react-native';
import AppoinmrntImage from '../ImageBox/appoinmentimage';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';
import moment from 'moment';

export default function NotificationBox({
  onPress,
  data,
}) {

  console.log(JSON.stringify(data) + " Data from id")

  return (
    <Pressable
      style={[styles.container, { backgroundColor: data?.visited ? CustomColors.white : CustomColors.lightblue }]}
      onPress={() => {
        onPress(data);
      }}>
      <View style={styles.imagecontainer}>
        <AppoinmrntImage uri={data?.uri == "" || data.uri == null ? "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" : data?.uri}></AppoinmrntImage>
      </View>
      <View>
        <View style={styles.textcontainer}>
          <Text style={styles.nameboldstyle}>{data.doctor_name}{" "}</Text>
          <Text style={styles.normaltextstyle}>{data?.title}</Text>
        </View>

        <View style={styles.textcontainer}>
          <Text style={styles.normaltextstyle}>{`"`}</Text>
          {data?.date ?
            <Text style={styles.nameboldstyle}>{moment(data?.date).format("DD-MM-YYYY")}{", "}{data?.quick_title}</Text>
            :
            <Text style={styles.nameboldstyle}>{data?.quick_title}</Text>
          }
          <Text style={styles.normaltextstyle}>{`"`}</Text>
        </View>
        <Text style={styles.normaltextstyle}>{data.time}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imagecontainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  normaltextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
  },
  nameboldstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabBold,
    // marginRight: 5,
  },
});
