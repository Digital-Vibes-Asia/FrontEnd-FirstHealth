import { ImageBackground, Linking, StyleSheet, Text, View } from "react-native"
import ActionBar from "../../common/ActionBar/actionbar";
import { useNavigation } from "@react-navigation/native";
import Check from "../../assets/icon/check_circle.svg"
import { CustomColors, CustomDimensions, CustomFonts, CustomFontSize } from "../../utils/common/CustomStyles";
import { Image } from "react-native";
import OutlineIcon from "../../common/Button/OutlineIcon";
import { horizontalScale, verticalScale } from "../../utils/common/Metrics";
import { UrlBase } from "../../utils/common/urlbase";

const TermsAndCondition = () => {
    const navigation = useNavigation();

    const CheckList = ({ text }) => {
        return (
            <>
                <View style={styles.listContainer}>
                    <Check width={CustomDimensions.icon_width_20} height={CustomDimensions.icon_height_20}></Check>
                    <Text style={styles.description}>
                        {text}
                    </Text>
                </View>
            </>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <ActionBar txt={"Terms & Conditions"} onPress={() => navigation.goBack()} />
                <View style={styles.bodyContainer}>
                    <Text style={styles.headText}>First Health Terms and Condition:</Text>
                    <View style={{gap: verticalScale(8),paddingVertical: verticalScale(8), paddingHorizontal: 0}}>
                        <CheckList text={"Terms & Cond #1"} />
                        <CheckList text={"Terms & Cond #2"} />
                        <CheckList text={"Terms & Cond #3"} />
                    </View>
                    <View>
                        <OutlineIcon value={"Download full T&C"} icon={"download"} onPress={()=> {
                            Linking.openURL(UrlBase?.TANDC)}} />
                    </View>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <Image source={require("../../assets/images/footer_v1.png")} style={styles.footerImage}/>
                <Image source={require("../../assets/images/footer_v2.png")} style={styles.footerImage}/>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
    bodyContainer: {
        borderRadius: verticalScale(8),
        borderWidth: horizontalScale(1),
        paddingVertical: verticalScale(32),
        paddingHorizontal: horizontalScale(16),
        margin: verticalScale(16),
        borderColor: CustomColors.bordercolour,
    },
    listContainer: {
        display: "flex",
        flexDirection:"row",
        margin: verticalScale(4),
        alignItems: "center"
    },
    footerContainer: {
        position: "absolute",
        bottom: 0
    },
    footerImage: {
        width: CustomDimensions.screenWidth,
        position: "absolute",
        bottom: 0
    },
    headText :{
        fontFamily: CustomFonts.PoppinsRegular,
        fontSize: verticalScale(18),
        lineHeight: verticalScale(22),
        color: CustomColors.neutral_700
    },
    description : {
        fontFamily: CustomFonts.PoppinsRegular,
        fontSize: verticalScale(14),
        lineHeight:verticalScale(18),
        marginLeft: horizontalScale(4)
    }
})

export default TermsAndCondition;