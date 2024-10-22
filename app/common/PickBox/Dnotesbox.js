import { StyleSheet, Pressable, Text, View, Image } from 'react-native';
import { CustomColors } from '../../utils/common/CustomColors';
import LinearGradient from 'react-native-linear-gradient';
import { CustomDimensions, CustomFontSize, CustomFonts } from '../../utils/common/CustomFont';

export default function DateSlotBox({
  onPress,
  data
}) {
  return (
    <Pressable onPress={() => {
      onPress(data)

    }}>
      <LinearGradient colors={data.active ? styles.active_colour : styles.in_active} style={{ paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, paddingVertical: 10, }}>
        <View style={styles.imagecontainer}>
          <Image
            style={styles.image}
            tintColor={data?.active ? CustomColors.textcolour : CustomColors.textcolour}
            source={{
              uri: data?.image,
            }}></Image>
        </View>
        <Text style={[styles.boldtextstyle, { color: data?.active ? CustomColors.textcolour : CustomColors.textcolour }]}>{data?.name}</Text>
      </LinearGradient>


    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    width: 70,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: CustomFontSize.small,    
    fontFamily:CustomFonts.RobotoSlabBold,
    alignSelf: "center",
    paddingVertical: 5,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'stretch',
    alignSelf: "center",
  },
  imagecontainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    // padding:10,
  },
  active_colour: ["#CAF4FF", "#A0DEFF", "#A0DEFF",
  ],
  in_active: ['#fff', '#fff', '#fff']
});