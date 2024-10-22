import { Image, StyleSheet, Pressable, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import AppoinmrntImage from '../ImageBox/appoinmentimage';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function ReplyBox({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.profilecontainer}>
        <View style={styles.imageandtxtcontainer}>
          <View style={styles.imgcontainer}>
            <AppoinmrntImage uri={data?.uri == "" || data.uri == null ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : data?.uri}></AppoinmrntImage>
          </View>

          <View style={styles.wholetxtcontainer}>
            <View>
              <Text style={styles.nameboldstyle}>{data?.doctor_name}</Text>
              <Text style={styles.normaltextstyle}>{data?.designation}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.timestyle}>{data?.restimeAgo}</Text>
      </View>
      <Text style={styles.ansstyle}>{data?.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: CustomColors.bordercolour,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  profilecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageandtxtcontainer: {
    flexDirection: 'row',
  },
  imgcontainer: {
    paddingRight: 10,
  },

  wholetxtcontainer: {
    alignItems: 'baseline',
    flexDirection: 'row',
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
  },
  timestyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.small,
    fontFamily: CustomFonts.RobotoSlabRegular,
  },
  ansstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    marginTop: 7,
  },
});
