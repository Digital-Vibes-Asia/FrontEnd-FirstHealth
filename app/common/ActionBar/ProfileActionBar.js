import { TextInput, StyleSheet, View, Pressable, Text, Image } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/common/Metrics";
import BackButton from "../../assets/icon/backbutton.svg";
import LinearGradient from "react-native-linear-gradient";
import { ProgressBar } from "react-native-paper";

const dummyUri = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxgwwjb2x1s9vsqEKCnCZ9P0YnqZaJQRnb2FuG9wlyCoJ3zfpgLA38rkwKg&s"

export default function ProfileActionBar({ onPress, txt, progress }) {
  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 2 }}
        colors={[CustomColors.new_theme_clr, CustomColors.theme_clr]}
        style={[styles.container]}
      >
        <Pressable style={styles.buttonContainer} onPress={onPress}>
          <BackButton
            width={CustomDimensions.icon_width_50}
            height={CustomDimensions.icon_height_50}
          ></BackButton>
        </Pressable>
        <View style={styles.content}>
          <View  style={styles.imagecontainer}>
            <Image style={styles.image} source={{uri: dummyUri}} width={120} height={120} />
          </View>
          <Text style={styles.ttiletxt}>{txt}</Text>
        </View>
      </LinearGradient>
      {progress && (
        <ProgressBar progress={progress} color={CustomColors.progress_clr} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.new_theme_clr,
    paddingVertical: verticalScale(15),
    // height: 100,
    borderWidth: moderateScale(1),
    // borderColor: CustomColors.bordercolour,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: horizontalScale(32),
    paddingVertical: 0
  },

  buttonContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    // marginHorizontal: 20,
    padding:verticalScale(12),
  },
  imagecontainer: {
    // overflow: 'hidden',
    // borderRadius: 100,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginLeft: 16,
    // marginRight: 16,
    // gap: verticalScale(16),
    padding: verticalScale(16),
    paddingBottom:0,
},
image: {
    // height: verticalScale(50),
    // width: horizontalScale(48),
    borderRadius: verticalScale(100),
    borderWidth: horizontalScale(3),
    padding: verticalScale(18),
    gap: verticalScale(8),
    borderColor: CustomColors.pink
},
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: verticalScale(16)
  },
  ttiletxt: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsMedium,
    margin: verticalScale(8)
  },
});
