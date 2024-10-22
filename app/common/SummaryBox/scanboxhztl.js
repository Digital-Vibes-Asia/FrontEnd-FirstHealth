import { StyleSheet, Pressable, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

import ProgressingWw from '../Progress/ProgressingWw';
import moment from 'moment';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function ScanBoxHztl({ onPress, data, index, dwld, selected }) {

  let date = ""


  if (data?.given_date) {
    given = data?.given_date + " " + data?.given_time
    date = new Date(given)
  }


  return (
    <Pressable style={[styles.container, { backgroundColor: index % 2 == 0 ? CustomColors.white : CustomColors.grey_bglight, borderColor: CustomColors.bordercolour, borderWidth: 1, }]} onPress={() => {
      onPress(data)
    }}>
      <View>
        {data?.first_visits &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.first_visits}
          </Text>
        }
        {data?.["12_14_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["12_14_weeks"]}
          </Text>
        }
        {data?.["16_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["16_weeks"]}
          </Text>
        }
        {data?.["20_22_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["20_22_weeks"]}
          </Text>
        }
        {data?.["24_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["24_weeks"]}
          </Text>
        }
        {data?.["28_30_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["28_30_weeks"]}
          </Text>
        }
        {data?.["32_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["32_weeks"]}
          </Text>
        }
        {data?.["34_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["34_weeks"]}
          </Text>
        }
        {data?.["36_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["36_weeks"]}
          </Text>
        }
        {data?.["37_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["37_weeks"]}
          </Text>
        }
        {data?.["38_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["38_weeks"]}
          </Text>
        }
        {data?.["39_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["39_weeks"]}
          </Text>
        }

        {data?.["40_weeks"] &&
          <Text key={index}
            style={styles.titletextstyle}
          // numberOfLines={2}
          // ellipsizeMode="tail"
          >
            {data?.["40_weeks"]}
          </Text>
        }

        {date != "" &&
          <Text style={styles.qntxtstyle} numberOfLines={6} ellipsizeMode="tail">
            {moment(date).format("DD-MM-YYYY hh:mm A")}

          </Text>
        }
      </View>
      {selected?.report_id == data?.report_id ? selected?.dstatus?.id == 1 && <Pressable style={styles.dwld_container} >
        <ProgressingWw color={CustomColors.white}></ProgressingWw>
      </Pressable> :
        <Pressable style={styles.dwld_container} onPress={() => {
          dwld(data)
        }}>
          <MaterialCommunityIcons
            name="cloud-download"
            size={20}
            backgroundColor={CustomColors.button_colour}
            color="#fff"></MaterialCommunityIcons>
        </Pressable>
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.grey_background,
    // width: 160,
    // minHeight:150,
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titletextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabBold,
    maxWidth: "80%"
  },
  qntxtstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    marginTop: 7,
  },
  dwld_container: { width: 50, height: 50, borderRadius: 50, backgroundColor: CustomColors.button_colour, alignItems: "center", justifyContent: "center", }
});
