import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import {
  CustomColors,
  CustomDimensions,
  CustomFontSize,
  CustomFonts,
} from '../../utils/common/CustomStyles';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../utils/common/Metrics';
import BackButton from '../../assets/icon/backbutton.svg';
import ActivityIcon from '../../assets/icon/menu(light).svg';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from 'react-native-paper';

export default function ActionBar({ onPress, txt, progress, actionIcon }) {
  const IconBar = ({ icon }) => {
    switch (icon) {
      case 'activity':
        return <ActivityIcon
          width={CustomDimensions.icon_width_30}
          height={CustomDimensions.icon_height_30}></ActivityIcon>;
      default:
        return (
          <BackButton
            width={CustomDimensions.icon_width_50}
            height={CustomDimensions.icon_height_50}></BackButton>
        );
    }
  };

  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 2 }}
        colors={[CustomColors.new_theme_clr, CustomColors.theme_clr]}
        style={[styles.container]}>
        <Pressable style={{ marginHorizontal: 20 }} onPress={onPress}>
          <IconBar icon={actionIcon} />
        </Pressable>
        <Text style={styles.ttiletxt}>{txt}</Text>
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
    paddingVertical: verticalScale(16),
    // height: 100,
    borderWidth: moderateScale(1),
    // borderColor: CustomColors.bordercolour,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // shadowProp: {
  //   shadowColor: CustomColors.black,
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 3,
  // },

  // elevation: {
  //   elevation: 20,
  //   shadowColor: CustomColors.black,
  // },

  ttiletxt: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsMedium,
  },
});
