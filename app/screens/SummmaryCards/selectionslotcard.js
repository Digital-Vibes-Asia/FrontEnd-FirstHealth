import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';
import DisplaySelectionBox from '../../common/textbox/displayselectionbox';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function SelectionSlotCard({
  heading,
  releventarr,
  count,
  onPress,
}) {

  console.log(JSON.stringify(releventarr)+' Relevant Array..')
  console.log(JSON.stringify(count)+' count Array..')
  return (
    <View>
      <Text style={styles.boldtextstyle}>
        {heading}
        {' ('}
        {count} {'slots'}
        {')'}
      </Text>

      <View style={styles.specialitiesContainer}>
        {releventarr.map(items => {
          return (
            <View style={styles.slot_container} key={items.id}>
              <DisplaySelectionBox
                data={items}
                onPress={onPress}></DisplaySelectionBox>
            </View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.title,    
    fontFamily:CustomFonts.RobotoSlabBold,
    marginBottom: 5,
  },

  specialitiesContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slot_container: {
    paddingRight: 10,
    paddingVertical: 10,
  },
});
