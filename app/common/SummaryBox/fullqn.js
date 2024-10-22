import { StyleSheet, Pressable, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function FullQn({ onChangeText, title, fullqn, time }) {
  return (
    <Pressable style={styles.container} onPress={onChangeText}>
      <View style={styles.titleandtime}>
        <Text
          style={styles.titletextstyle}
          numberOfLines={3}
          ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.timestyle}>{time}</Text>
      </View>
      <Text style={styles.qntxtstyle}>{fullqn}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: CustomColors.bordercolour,
    borderWidth: 1,
    minHeight: 250,
    borderRadius: 10,
    padding: 10,
  },
  titletextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.RobotoSlabBold,
    maxWidth: "70%",
  },
  qntxtstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    marginTop: 5,
  },
  timestyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.small,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    marginRight: 10,
  },
  titleandtime: {
    justifyContent: 'space-between', flexDirection: 'row'
  }
});
