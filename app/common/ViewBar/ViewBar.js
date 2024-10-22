import LinearGradient from "react-native-linear-gradient";
import { CustomColors, CustomFonts } from "../../utils/common/CustomStyles";
import { Image, StyleSheet, Text, View } from "react-native";
import { horizontalScale, verticalScale } from "../../utils/common/Metrics";


const ViewBar = ({head,subHead, headWeight , subWeight}) => {
const dummyUri = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxgwwjb2x1s9vsqEKCnCZ9P0YnqZaJQRnb2FuG9wlyCoJ3zfpgLA38rkwKg&s"

    return (
        <>
            <LinearGradient start={{ x: 0, y: 0  }} end={{ x: 0, y: 2 }} colors={[CustomColors.new_theme_clr, CustomColors.theme_clr,]} style={[styles.container]} >
                <View style={styles.imagecontainer}>
                    <Image style={styles.image} source={{ uri: dummyUri}}></Image>
                </View>
                <View style={styles.textContainer}>
                    <Text style={{...styles.header,lineHeight:verticalScale(14), fontSize: headWeight, fontFamily: CustomFonts.PoppinsRegular}}>{head}</Text>
                    <Text style={{...styles.header,lineHeight:verticalScale(22), fontSize: subWeight, fontFamily: CustomFonts.PoppinsMedium}}>{subHead}</Text>
                </View>
            </LinearGradient>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: CustomColors.new_theme_clr,
        // paddingVertical: verticalScale(15),
        // paddingVertical:verticalScale(16),
        // height: 100,
        borderWidth: horizontalScale(0),
        // borderColor: CustomColors.bordercolour,
        display:"flex",
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
        // alignItems: "center",
        // gap:16
    },
    imagecontainer: {
        // overflow: 'hidden',
        // borderRadius: 100,
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginLeft: 16,
        // marginRight: 16,
        gap: verticalScale(16),
        padding: verticalScale(16),
    },
    image: {
        height: verticalScale(50),
        width: horizontalScale(48),
        borderRadius: verticalScale(100),
        borderWidth: horizontalScale(3),
        padding: verticalScale(18),
        gap: verticalScale(8),
        borderColor: CustomColors.pink
    },
    header: {
        color: "white",
        marginHorizontal: horizontalScale(4),
        // marginVertical: 2
    },
    textContainer : {
        // display:"flex",
        // flexDirection:"column",
        // alignItems: "flex-start",
        // justifyContent: "center"
        gap:verticalScale(4)
    }
})

export default ViewBar;