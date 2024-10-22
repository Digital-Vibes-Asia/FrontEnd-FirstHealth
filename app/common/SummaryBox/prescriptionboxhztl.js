import { StyleSheet, Pressable, Text, View, Image } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function PrescriptionBoxHztl({ onPress, data }) {


  console.log(moment(data.appointment_date).format("DD-MM-YYYY") + " Data what is coming....")

  const date = moment(data.appointment_date).format("DD-MM-YYYY")
  
  return (
    <>
      <Pressable style={styles.container} onPress={() => {
        onPress(data)
      }}>
        {/* <Text
        style={styles.date_style}
        numberOfLines={2}
        ellipsizeMode="tail">
        {data.date}
      </Text> */}

        <Text
          style={styles.bold_style}
          ellipsizeMode="tail">
          {"Dr."} {data?.doctor_name}
        </Text>
        <Text
          style={styles.nrml_txt}
          numberOfLines={2}
          ellipsizeMode="tail">
          {data?.purpose}
        </Text>
        {data?.appointment_date &&
          <Text
            style={styles.nrml_txt}
            numberOfLines={2}
            ellipsizeMode="tail">
            {date}
          </Text>

        }



      </Pressable>
      <View style={styles.bottom_container}>

        {data?.labstatus &&

          <View style={styles.img_container}>
            <Image
              style={styles.img}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/2446/2446700.png",
              }}
            />
          </View>
        }
        {data?.scanstatus &&
          <View style={styles.img_container}>
            <Image
              style={styles.img}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/8004/8004375.png",
              }}
            />
          </View>
        }
        {data?.prescriptionstatus &&
          <View style={styles.img_container}>
            <Image
              style={styles.img}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/2873/2873154.png",
              }}
            />
          </View>
        }

        {/* <FontAwesome5
        name="notes-medical"
        size={22}
        color={CustomColors.button_colour}></FontAwesome5> */}

        {/* <View style={{marginRight:10}}>
      <FontAwesome5
        name="notes-medical"
        size={22}
        color={CustomColors.button_colour}></FontAwesome5>
    </View>
    <View style={{marginRight:10}}>
      <FontAwesome5
        name="notes-medical"
        size={22}
        color={CustomColors.button_colour}></FontAwesome5>
    </View>
    <View style={{marginRight:10}}>
      <FontAwesome5
        name="notes-medical"
        size={22}
        color={CustomColors.button_colour}></FontAwesome5>
    </View> */}

      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: CustomColors.bordercolour,
    borderWidth: 1,
    minHeight: CustomDimensions.height_150,
    borderRadius: 10,
    padding: 15,
    width: CustomDimensions.width_150,

  },
  bold_style: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabBold,
    // alignSelf: "center",
    // textDecorationLine: "underline",
    marginBottom: 5,

  },
  nrml_txt: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    marginBottom: 5,
    // alignSelf: "center",
  },
  qntxtstyle: {
    color: CustomColors.textcolour,
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 7,
  },
  img_container: { marginRight: 10, width: 30, height: 30, borderRadius: 30, overflow: "hidden", backgroundColor: CustomColors.textcolour, padding: 5 },
  img: { width: "100%", height: "100%", tintColor: CustomColors.white },
  bottom_container: { flexDirection: "row", backgroundColor: CustomColors.light_blue, position: "absolute", bottom: 0, width: "100%", borderTopLeftRadius: 50, justifyContent: "flex-end", minHeight: 50, alignItems: "center", paddingVertical: 10 }
});
