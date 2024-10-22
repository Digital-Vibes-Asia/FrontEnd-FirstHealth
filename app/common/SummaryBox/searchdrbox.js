import { Image, StyleSheet, Pressable, Text, View, Keyboard } from 'react-native';
import { useEffect } from 'react';
import { CustomColors } from '../../utils/common/CustomColors';
import AppoinmentImage from '../ImageBox/appoinmentimage';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function SearchDrBox({ onPress, data }) {

  console.log(JSON.stringify(data) + "Empty.....")

  return (
    <>
      <Pressable
        style={[styles.container]}
        onPress={() => {
          onPress(data);
        }}>
        <View style={styles.imagecontainer}>
          <AppoinmentImage uri={data?.profile_img == "" ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : data?.profile_img}></AppoinmentImage>
        </View>
        <View>
          <View style={styles.textcontainer}>
            <Text style={styles.nameboldstyle}>{data.name}{","}</Text>
            <Text style={styles.hintclrtextstyle}>{data.doctor_code}</Text>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.normaltextstyle}>{data.designation}</Text>
          </View>
        </View>
      </Pressable>


    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderRadius: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: CustomColors.bordercolour,
    borderWidth: 1,
  },
  textcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    // justifyContent: 'space-between',
    width: '80%',
  },

  imagecontainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 14,
    fontWeight: 'bold',
  },
  normaltextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.small,
    fontFamily: CustomFonts.RobotoSlabRegular,
    marginRight: 5,
  },
  nameboldstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabBold,
    marginRight: 5,
  },
  hintclrtextstyle: {
    color: CustomColors.hintcolour,
    fontSize: CustomFontSize.small,
    fontFamily: CustomFonts.RobotoSlabRegular,
    marginRight: 5,
  },
});
