import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
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
import FilterButton from '../../assets/icon/FilterButton.svg';
import FilterClose from '../../assets/icon/FilterClose.svg';
import LinearGradient from 'react-native-linear-gradient';
import LogoutAlert from '../Dialogs/LogoutAlert';
import FilterModal from '../Dialogs/FilterDialog';

export default function FilterBar({
  onPress,
  txt,
  icon,
  filterOpen,
  setFilterOpen,
}) {
  const IconBar = ({icon}) => {
    switch (icon) {
      case 'activity':
        return (
          <ActivityIcon
            width={CustomDimensions.icon_width_30}
            height={CustomDimensions.icon_height_30}></ActivityIcon>
        );
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
      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 2}}
          colors={[CustomColors.new_theme_clr, CustomColors.theme_clr]}
          style={[styles.container]}>
          <Pressable style={{marginHorizontal: 20}} onPress={onPress}>
            <IconBar icon={icon} />
          </Pressable>
          <Text style={styles.ttiletxt}>{txt}</Text>
        </LinearGradient>
        <Pressable
          onPress={() => setFilterOpen(!filterOpen)}
          style={styles.filterContainer}>
          {filterOpen ? (
            <></>
            // <FilterClose
            //   width={CustomDimensions.icon_width_70}
            //   height={CustomDimensions.icon_height_70}></FilterClose>
          ) : (
            <FilterButton
              width={CustomDimensions.icon_width_70}
              height={CustomDimensions.icon_height_70}></FilterButton>
          )}
        </Pressable>
        
      </View>
      <FilterModal modalVisible={filterOpen} setModalVisible={setFilterOpen}  />
    </>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    elevation: 5,
    backgroundColor: CustomColors.white,
    borderRadius: 7,
    padding: CustomDimensions.pad_20,
    alignItems: 'center',
  },
  container: {
    backgroundColor: CustomColors.new_theme_clr,
    paddingVertical: verticalScale(16),
    borderWidth: moderateScale(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // Ensure relative positioning for zIndex to work
  },
  filterContainer: {
    position: 'absolute',
    right: 0,
    top: '50%',
    elevation: 10,
    zIndex: 9999, // High zIndex to ensure it's above other elements
    flex: 2,
  },
  ttiletxt: {
    color: CustomColors.white,
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsMedium,
  },
});


// const styles = StyleSheet.create({
//   viewWrapper: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.2)',
//   },
//   modalView: {
//     position: 'absolute',
//     top: '40%',
//     left: '10%',
//     right: '10%',
//     elevation: 5,
//     backgroundColor: CustomColors.white,
//     borderRadius: 7,
//     padding: CustomDimensions.pad_20,
//     alignItems: 'center',
//   },
//   container: {
//     backgroundColor: CustomColors.new_theme_clr,
//     paddingVertical: verticalScale(16),
//     // height: 100,
//     borderWidth: moderateScale(1),
//     // borderColor: CustomColors.bordercolour,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   filterContainer: {
//     position: 'absolute',
//     right: 0,
//     top: '50%',
//     elevation:10,
//     flex:2
//   },
//   ttiletxt: {
//     color: CustomColors.white,
//     fontSize: CustomFontSize.title,
//     fontFamily: CustomFonts.PoppinsMedium,
//   },
// });