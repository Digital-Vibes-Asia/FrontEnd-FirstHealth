import { Pressable, StyleSheet, Text, View } from 'react-native';

import Focus from "../../assets/icon/focusicon.svg"
import { CustomColors, CustomFontSize, CustomFonts, CustomDimensions } from '../../utils/common/CustomStyles';

export default function FocusButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={{
      width: 60, height: 60, borderRadius: 60, backgroundColor: CustomColors.white, borderWidth: 1,
      borderColor: CustomColors.neutral_400, justifyContent: "center", alignItems: "center"
    }}>
      <Focus
        width={CustomDimensions.icon_width_30}
        height={CustomDimensions.icon_height_30}></Focus>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60, height: 60, borderRadius: 60, backgroundColor: CustomColors.white, borderWidth: 1,
    borderColor: CustomColors.neutral_400, justifyContent: "center", alignItems: "center"
  },
  
});
