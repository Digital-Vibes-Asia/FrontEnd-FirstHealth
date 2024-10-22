import { StyleSheet, Pressable, Text, View } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function DisplaySelectionBox({ onPress, data }) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          borderColor: data.selected
            ? CustomColors.white
            : CustomColors.button_colour,
          backgroundColor: data.selected
            ? CustomColors.button_colour
            : CustomColors.white,
        },
      ]}
      onPress={() => {
        onPress(data);
      }}>
      <Text
        style={[
          styles.boldtextstyle,
          {
            color: data.selected
              ? CustomColors.white
              : CustomColors.button_colour,
          },
        ]}>
        {data.from_time.split(" ")[0] + ' - ' + data.to_time.split(" ")[0]}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 5,
    minWidth: 100,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.normal,    
    fontFamily:CustomFonts.RobotoSlabRegular,
    padding: 5,
    
  },
  ripple_colour: {
    color: CustomColors.ripple_colour,
  },
});
