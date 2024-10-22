import {StyleSheet, Pressable, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CustomDimensions, CustomFonts, CustomFontSize } from '../../utils/common/CustomFont';

export default function QueryBoxHztl({onPress, data}) {
  return (
    <Pressable style={styles.container} onPress={()=>{
      onPress(data)
    }}>
      <Text
        style={styles.titletextstyle}
        numberOfLines={2}
        ellipsizeMode="tail">
        {data.title}
      </Text>
      <Text style={styles.qntxtstyle} numberOfLines={6} ellipsizeMode="tail">
        {data.query}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.grey_bglight,
    width: 160,
    minHeight:150,
    borderRadius: 10,
    padding: 10,
  },
  titletextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabBold,
  },
  qntxtstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.small,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    marginTop: 7,
  },
});
