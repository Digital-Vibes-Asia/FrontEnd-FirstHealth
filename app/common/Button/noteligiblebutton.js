import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CustomColors, CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NotEligibleButton({ onPress, value }) {

  return (
    <View style={styles.whole_container}>
      <Pressable
        style={styles.container}
        onPress={onPress}>
        <Text style={styles.button}>{value}</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={CustomDimensions.icon_30}
          color={CustomColors.white}
        ></MaterialCommunityIcons>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.theme_clr,
    // borderColor: CustomColors.theme_clr,
    padding: CustomDimensions.pad_10,
    borderRadius: CustomDimensions.brad_32,
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },

  whole_container: {
    margin: CustomDimensions.mar_10,

  },

  button: {
    color: CustomColors.oben_txt,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsSemiBold,
    // alignSelf: 'center',
    // textAlign:"center",
  },
});
