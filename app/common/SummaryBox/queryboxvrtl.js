import { StyleSheet, Pressable, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function QueryBoxVrtl({ onPress, data }) {

  return (
    <Pressable style={[styles.container, { backgroundColor: data.id % 2 == 0 ? CustomColors.white : CustomColors.grey_bglight }]} onPress={() => {
      onPress(data)
    }}>
      <View style={{ padding: 10 }}>
        <Text style={styles.timestyle}>{data?.timeAgo}</Text>
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
          {data?.title}
        </Text>
        <Text style={styles.qntxtstyle} numberOfLines={2} ellipsizeMode="tail">
          {data?.query}
        </Text>

      </View>


      <View style={[styles.newstatusdesign, {backgroundColor: data?.query_status == "Awaiting Response" ? CustomColors.dark_yellow : CustomColors.dark_green}]}>
        <Text style={[styles.statustxtstyle, {color: data?.query_status == "Awaiting Response" ? CustomColors.textcolour : CustomColors.white}]}>{data?.query_status}{" "}</Text>

        {data?.doctor_name &&
          <>
          {
            data?.query_status == "Awaiting Response" ? 
            <Text style={[styles.statustxtstyle, {color: data?.query_status == "Awaiting Response" ? CustomColors.textcolour : CustomColors.white}]}>{"from "}</Text>
            :  <Text style={[styles.statustxtstyle, {color: data?.query_status == "Awaiting Response" ? CustomColors.textcolour : CustomColors.white}]}>{"by "}</Text>
          }

            

            <Text style={[styles.dr_name_textstyle, {color: data?.query_status == "Awaiting Response" ? CustomColors.textcolour : CustomColors.white}]}>{"Dr."} {data?.doctor_name}</Text>
          </>
        }
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: CustomColors.bordercolour,
    // elevation: 5,
    borderWidth: 1,
    borderRadius: 10,
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
    fontSize: CustomFontSize.small,
    fontFamily:CustomFonts.RobotoSlabLight,

    position: "absolute",
    top: 10,
    right: 10,
  },
  statustxtstyle: {
    color: CustomColors.white,
    fontSize: CustomFontSize.normal,
    fontFamily:CustomFonts.RobotoSlabRegular
  },
  dr_name_textstyle: {
    color: CustomColors.white,
    fontSize: CustomFontSize.normal,
    fontFamily:CustomFonts.RobotoSlabBold
  },
  response: { justifyContent: "flex-end", alignSelf: "flex-end", position: "absolute", borderRadius: 5, padding: 5, flexDirection: "row", right: 5, top: 5 },
  newstatusdesign:{  backgroundColor: CustomColors.green, borderTopRightRadius: 100, borderTopLeftRadius: 100, justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 10,padding:5, }
});
