import { Image, StyleSheet, Text, View } from "react-native";
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import OutlineIcon from "../../common/Button/OutlineIcon";
import FillButton from "../../common/Button/ButtonFill";
import { useNavigation } from "@react-navigation/native";
import { CustomFonts } from "../../utils/common/CustomFont";
import NextFhButton from "../../common/Button/nextfhbutton";
import { verticalScale } from "../../utils/common/Metrics";

const CloseAccount = () => {
  const navigation = useNavigation();
  const handleBackHome = () => {
    navigation.navigate("Home");
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View>
            {/* <Frown width={CustomDimensions.icon_width_50} height={CustomDimensions.icon_height_50}></Frown> */}
            <Image source={require("../../assets/icon/frown.png")} width={60} />
          </View>
        </View>
        <Text style={styles.headText}>We're sorry to see you go</Text>
        <Text style={styles.textCenter}>
          If you wish to create an account, you may register for a new account
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <FillButton value={"Back to home"} onPress={handleBackHome} />
        <NextFhButton
          value={"Next, referral number"}
          icon={"false"}
          onPress={() => {
            // validation();
          }}
        ></NextFhButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    padding: verticalScale(16),
  },
  textCenter: {
    textAlign: "center",
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
    color: CustomColors.neutral_700,
  },
  container: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    gap: verticalScale(14),
    alignItems: "center",
    top: verticalScale(120),
    height: CustomDimensions.screenHeight,
  },
  btnContainer: {
    position: "absolute",
    bottom: 0,
    width: CustomDimensions.screenWidth,
  },
  headText: {
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(28),
    fontSize: verticalScale(24),
    color: CustomColors.neutral_700,
  },
});

export default CloseAccount;
