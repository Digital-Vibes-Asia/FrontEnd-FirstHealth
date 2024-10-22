import {Image, StyleSheet, Text, View} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/common/Metrics';
import {CustomColors, CustomFonts} from '../../utils/common/CustomStyles';

const ActivityCard = ({headText, subHead, desc, icon}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dispContainer}>
        <Image source={require('../../assets/images/DependantAvatar.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.header}>{headText}</Text>
          <Text style={styles.subtext}>{subHead}</Text>
          <Text style={styles.description}>{desc}</Text>
        </View>
        {icon ? <></> : <></>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: horizontalScale(4),
    borderWidth: verticalScale(1),
    borderColor: CustomColors.neutralgrey_200,
    padding: verticalScale(12),
    gap: verticalScale(8),
  },
  dispContainer: {
    display: "flex",
    flexDirection: "row",
    gap: horizontalScale(10)
  },
  header: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontSize: verticalScale(14),
    lineHeight: verticalScale(18),
    color: CustomColors.neutral_700,
  },
  subtext: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(14),
    color: CustomColors.neutral_600,
    lineHeight: verticalScale(18),
  },
  description: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: verticalScale(10),
    lineHeight: verticalScale(12),
  },
  textContainer: {
    gap: verticalScale(2),
  },
});

export default ActivityCard;
