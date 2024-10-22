import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import ActionBar from "../../common/ActionBar/actionbar";
import { useGetQuery } from "../../store/api";
import { UrlBase } from "../../utils/common/urlbase";
import FAQ from "../../common/SubscriptionPlan/faq";
import BackgorundWave from "../../assets/icon/backgroundwave.svg"
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import { useNavigation } from "@react-navigation/native";
import { verticalScale } from "../../utils/common/Metrics";
import Progressing from "../../common/Progress/Progressing";

const FAQComp = () => {
  const navigation = useNavigation();
  const {
    data: faqData,
    error: faqError,
    refetch: faqRefetch,
  } = useGetQuery(UrlBase.GETFAQ);
  return (
    <>
      <View>
        <ActionBar
          txt={"Frequently Asked Question"}
          onPress={() => navigation.goBack()}
        />
      </View>
      {
        !faqData ? <Progressing /> : <>
         <ScrollView>
        <View style={styles.container}>
          <View style={{ marginTop: "5%", marginBottom: "2%" }}>
            {faqData &&
              faqData.map((item) => {
                return <FAQ key={item.id} item={item}></FAQ>;
              })}
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerContent}>
              For any enquires, contact support at
            </Text>
            <Text style={{ ...styles.footerContent, ...styles.footerDesc }}>
              example@firsthealth.com
            </Text>
          </View>
        </View>
      </ScrollView></>
      }
     
      {/* <BackgorundWave width={"100%"} height={"20%"} ></BackgorundWave> */}
      <View style={styles.fooContainer}>
        <Image
          source={require("../../assets/images/footer_v1.png")}
          style={styles.footerImage}
        />
        <Image
          source={require("../../assets/images/footer_v2.png")}
          style={styles.footerImage}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: verticalScale(16),
  },
  footerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  footerContent: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(12),
    lineHeight: verticalScale(14),
  },
  fooContainer: {
    position: "absolute",
    bottom: 0,
  },
  footerImage: {
    width: CustomDimensions.screenWidth,
    position: "absolute",
    bottom: -50,
  },
  footerDesc: {
    color: CustomColors.new_theme_clr,
  },
});

export default FAQComp;
