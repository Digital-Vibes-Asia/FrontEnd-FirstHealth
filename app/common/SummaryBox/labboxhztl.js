import { StyleSheet, Pressable, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

import ProgressingWw from '../Progress/ProgressingWw';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function LabBoxHztl({ onPress, data, index, dwld, selected }) {
  console.log(JSON.stringify(selected) + "....Selected....")


  return (
    <Pressable style={[styles.container, { backgroundColor: index % 2 == 0 ? CustomColors.white : CustomColors.grey_bglight, borderColor: CustomColors.bordercolour, borderWidth: 1, }]} onPress={() => {
      onPress(data)
    }}>
      <View>
        {data?.lab_test && data?.lab_test.map((item, index) => {
          return (<Text key={index}
            style={styles.titletextstyle}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item}
          </Text>
          )
        })
        }
        <Text style={styles.qntxtstyle} numberOfLines={6} ellipsizeMode="tail">
          {data?.date}
        </Text>
      </View>
      {selected?.id == data.id ? selected?.dstatus?.id == 1 && <Pressable style={styles.dwld_container} >
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
    fontFamily: CustomFonts.RobotoSlabBold,
  },
  qntxtstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabRegular,
    marginTop: 7,
  },
  dwld_container: { width: 50, height: 50, borderRadius: 50, backgroundColor: CustomColors.button_colour, alignItems: "center", justifyContent: "center", }
});
