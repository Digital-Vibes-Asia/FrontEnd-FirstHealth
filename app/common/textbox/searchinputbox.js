import {TextInput, StyleSheet, View, Pressable, Text, Keyboard} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { CustomDimensions, CustomFonts, CustomFontSize } from '../../utils/common/CustomFont';

export default function SearchInputBox({hint, back, clear, value, setvalue}) {
  
  return (
    <View style={styles.wholecontainer}>
      <Pressable
        style={styles.firsthalf}
        onPress={back}
        android_ripple={styles.ripple_colour}>
        <Ionicons
          style={styles.backiconstyle}
          name="arrow-back"
          size={CustomDimensions.icon_size}
          color={CustomColors.textcolour}></Ionicons>
      </Pressable>
      <View style={styles.seconfhalf}>
        <View style={styles.container}>
          <Ionicons
            style={styles.iconstyle}
            name="search-outline"
            size={CustomDimensions.icon_size}
            color={CustomColors.textcolour}></Ionicons>
           
          <TextInput
            style={styles.textstyle}
            placeholder={hint}
            autoFocus={true}
            value={value}
           
            onChangeText={setvalue}
            placeholderTextColor={CustomColors.hintcolour}
            editable={true}></TextInput>
           
        </View>
        {value.length > 0 && (
          <Pressable onPress={clear} android_ripple={styles.ripple_colour}>
            <Ionicons
              style={styles.iconstyle}
              name="close"
              size={CustomDimensions.icon_size}
              color={CustomColors.red}></Ionicons>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wholecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:10,
  },
  firsthalf: {
    width: '10%',
    height: 40,
    alignContent: 'center',
    justifyContent: 'center',
  },
  seconfhalf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: CustomColors.bordercolour,
    borderRadius: 20,
    height: 40,
    width: '90%',
    alignItems: 'center',
  },

  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily:CustomFonts.RobotoSlabRegular,
    maxWidth: '70%',
  },
  iconstyle: {
    padding: 10,
  },
  titlestyle: {
    color: CustomColors.textcolour,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backiconstyle: {
    paddingRight: 10,
  },
  ripple_colour: {
    color: CustomColors.ripple_colour5,
  },
});
