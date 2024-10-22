import { Image, StyleSheet, Pressable, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import AppoinmentImage from '../ImageBox/appoinmentimage';
import { CustomDimensions, CustomFonts, CustomFontSize } from '../../utils/common/CustomFont';



export default function AppoinmentBox({
  onPress,
  data,
}) {
  console.log(JSON.stringify(data) + '....Profile data...')
  let doc_img = data?.profile_img ? data?.profile_img == "N/A" ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : data?.profile_img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

  // if(data?.doctor_name != "Meena"){
  //  doc_img = data?.profile_img ? data?.profile_img == "N/A" ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : data?.profile_img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
  // }

  return (
    <Pressable
      style={[styles.container, {
        backgroundColor: data?.status == 'Pending'
          ? CustomColors.pending_status : data?.status == 'Scheduled' ? CustomColors.finished
            : data?.status == 'Canceled' ? CustomColors.canceled : CustomColors.white
      }]}
      onPress={() => {
        onPress(data)
      }}>
      <View style={styles.imagecontainer}>
        <AppoinmentImage uri={doc_img}></AppoinmentImage>
      </View>
      <View>
        <View style={styles.textcontainer}>
          <Text style={styles.nameboldstyle}>{data?.doctor_name}</Text>
          <Text style={styles.normaltextstyle}>{data?.doctor_designation}</Text>

        </View>
        <Text style={styles.normaltextstyle}>{data?.branch_name}</Text>

        <View style={styles.textcontainer}>
          <Text style={styles.normaltextstyle}>{data?.status}</Text>
          <Text style={styles.boldtextstyle}>{data?.appointment_date}{" "}</Text>
          <Text style={styles.boldtextstyle}>{data?.from_time}{" - "}</Text>
          <Text style={styles.boldtextstyle}>{data?.to_time}</Text>
        </View>
        <Text style={styles.normaltextstyle}>{data?.purpose}</Text>
      </View>
    </Pressable>


  );
}

const styles = StyleSheet.create({
  container: {
    // height: 90,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 5,
    alignItems: "baseline",
  },

  imagecontainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.small,
    fontFamily: CustomFonts.RobotoSlabBold,
  },
  normaltextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.small,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    marginRight: 5,
  },
  nameboldstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabBold,
    marginRight: 5,
  },
});
