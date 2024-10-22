import { StyleSheet, Pressable, Text, View, Image } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function NotesBoxVrtl({ onPress, data, index }) {
  console.log(JSON.stringify(data) + " Data from Notes")

  const date = moment(new Date(data?.appointment_date)).format("DD-MM-YYYY")

  return (
    <>
      <Pressable style={[styles.container, { backgroundColor: index % 2 == 0 ? CustomColors.white : CustomColors.grey_background }]} onPress={() => {
        onPress(data)
      }}>
        <View style={{ padding: 10 }}>
          {/* <Text style={styles.timestyle}>{data?.date}</Text> */}
          {/* <View style={[styles.response, { backgroundColor: data?.query_status == 'Awaiting Response' ? CustomColors.upcoming_dot : CustomColors.finished_dot }]}>
        <Text style={[styles.statustxtstyle, { color: data?.query_status == 'Awaiting Response' ? CustomColors.textcolour : CustomColors.white }]}>{data?.query_status}</Text>
        {data?.doctor_name &&  data?.query_status == 'Awaiting Response' &&
          <Text style={[styles.statustxtstyle, { color: data?.query_status == 'Awaiting Response' ? CustomColors.textcolour : CustomColors.white }]}>{" from "}</Text>
        }
        {data?.doctor_name &&  data?.query_status != 'Awaiting Response' &&
          <Text style={[styles.statustxtstyle, { color: data?.query_status == 'Awaiting Response' ? CustomColors.textcolour : CustomColors.white }]}>{" by "}</Text>
        }
        {data?.doctor_name &&
          <Text style={[styles.dr_name_textstyle, { color: data?.query_status == 'Awaiting Response' ? CustomColors.textcolour : CustomColors.white }]}>{" Dr."}{data?.doctor_name}</Text>
        }

      </View> */}
          <Text
            style={styles.titletextstyle}
            numberOfLines={2}
            ellipsizeMode="tail">
            {"Dr."} {data?.doctor_name}
          </Text>
          <Text style={styles.qntxtstyle} numberOfLines={2} ellipsizeMode="tail">
            {data?.purpose}
          </Text>
          {data?.appointment_date &&
            <Text style={styles.qntxtstyle} numberOfLines={2} ellipsizeMode="tail">
              {date}
            </Text>
          }
        </View>

      </Pressable>
      <View style={styles.newstatusdesign}>
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

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: CustomColors.bordercolour,
    // elevation: 5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    // padding: 10,
  },
  titletextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily:CustomFonts.RobotoSlabBold
  },
  qntxtstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily:CustomFonts.RobotoSlabRegular,
    marginTop: 5,
  },
  timestyle: {
    alignSelf: 'flex-end',
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
 fontFamily:CustomFonts.RobotoSlabRegular,

    position: "absolute",
    top: 10,
    right: 10,
  },
  statustxtstyle: {
    color: CustomColors.white,
    fontSize: 14,
    fontWeight: 'normal',
  },
  dr_name_textstyle: {
    color: CustomColors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  response: { justifyContent: "flex-end", alignSelf: "flex-end", position: "absolute", borderRadius: 5, padding: 5, flexDirection: "row", right: 5, top: 5 },
  newstatusdesign: {
    justifyContent: "flex-end", alignItems: "center", flexDirection: "row", padding: 5, minHeight: 40,
    position: "absolute", right: 0, top: 0, minWidth: 150, borderBottomLeftRadius: 40, paddingHorizontal: 10, paddingVertical: 10,
  },
  img_container: { marginRight: 10, width: 30, height: 30, borderRadius: 30, overflow: "hidden", backgroundColor: CustomColors.button_colour, padding: 5 },
  img: { width: "100%", height: "100%", tintColor: CustomColors.white },
});
