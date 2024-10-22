import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import Avatar from '../ImageBox/avatar';
import SearchBox from '../textbox/searchbox';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function HeadBar({ onPress1, uri, hint, onPress2 }) {
  return (
    <View style={{backgroundColor:CustomColors.actionbar_clr, padding:CustomDimensions.pad_5}}>
      <View style={styles.container}>
        <Avatar uri={uri} onPress={onPress1}></Avatar>
        <Pressable style={styles.searchbox}>
          <SearchBox hint={hint} onPress={onPress2}></SearchBox>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: CustomDimensions.mar_20,
    marginBottom: CustomDimensions.mar_10,
    marginHorizontal: CustomDimensions.mar_20,
  },

  searchbox: {
    width: CustomDimensions.width_80,
  },
});
