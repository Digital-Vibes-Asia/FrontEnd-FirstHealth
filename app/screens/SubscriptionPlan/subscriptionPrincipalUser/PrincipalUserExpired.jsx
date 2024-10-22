import {Pressable, ScrollView, Text, View} from 'react-native';
import {
  CustomColors,
  CustomFonts,
  CustomFontSize,
} from '../../../utils/common/CustomStyles';
import ActionBoxDependent from '../../../common/ActionBoxDependent/ActionBoxDependent';
import {horizontalScale, moderateScale, verticalScale} from '../../../utils/common/Metrics';
import {StyleSheet} from 'react-native';
import AlertIcon from '../../../assets/icon/cautionIcon.svg';
import DoubleUserIcon from '../../../assets/icon/doubleUserIcon.svg';
import UserPlusIconSmall from '../../../assets/icon/addpersonicon.svg';
import FreeSlotsButton from '../../../common/Button/freeSlotsButton';
import CheckBoxIcon2 from '../../../assets/icon/check_circle.svg';
import ListIcon from '../../../assets/icon/menu.svg';
import InfoIcon3 from '../../../assets/icon/infoIcon3.svg';
import ListPaperIcon from '../../../assets/icon/listPaperIcon.svg';
import ProgressBox from '../../../common/ProgressBox/progressBox';
import CommonSlots from '../../../common/CommonSlots/commonSlots';
import RightArrow from '../../../assets/icon/rightarrow.svg';
import {useMemo, useState} from 'react';
import NextFillButton from '../../../common/Button/nextfillbutton';
import OutlineIcon from '../../../common/Button/OutlineIcon';
import {useNavigation} from '@react-navigation/native';
import DowngradeAlert from '../../../common/Dialogs/DownGradeAlert';

export default function PrincipalUserExpired({data, fetching}) {
  const [visible,setVisible] = useState(false)
  const navigation = useNavigation();
  const activePeriod = data?.user_subscription?.is_qualifying_period;
  const totalEmerCalls = data?.user_subscription?.t_emergency_calls || 0;
  const totalNonEmerCalls = data?.user_subscription?.t_clinic_calls || 0;

  const userName = useMemo(() => {
    return data?.user_subscription?.name;
  }, [data]);

  const handleModal = () => {
    setVisible(!visible)
  }

  const planName = useMemo(() => {
    return data?.user_subscription?.subscription_master?.plan;
  }, [data]);

  const startDate = data?.user_subscription?.start_date;
  const endDate = data?.user_subscription?.end_date;
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);

  // Start Date Convert to the desired format
  const formattedStartDate = sDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // End Date Convert to the desired format
  const formattedEndDate = eDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  function CommonDependant({activePeriod}) {
    return (
      <View
        style={[
          styles.cont1,
          {
            paddingTop: activePeriod && 10,
          },
        ]}>
        <View style={styles.cont2}>
          <DoubleUserIcon />
          <Text
            style={[styles.subsTxt, {paddingHorizontal: horizontalScale(10)}]}>
            Dependants
          </Text>
        </View>
        {/* <View style={styles.cont2}>
          <Text style={styles.conTxt}>Purchase new slot</Text>
          <UserPlusIconSmall />
        </View> */}
      </View>
    );
  }

  const demoArr = [
    {name: 'Nur Rayanah Sayed', progress: 1, range1: 2, range2: 1},
    {
      link: 1,
      linkName: 'Invite Sent',
      name: 'syedhamidi@email.com',
      status: 'pending',
    },
    {
      link: 2,
      linkName: 'Linked',
      name: 'Siti Aminah binti Sayed',
      progress: 2,
      range1: 0,
      range2: 1,
      status: 'accepted',
    },
    {
      link: 2,
      linkName: 'Invite rejected',
      name: 'maisarah@email.com',
      status: 'rejected',
    },
  ];

  return (
    <View style={{backgroundColor: CustomColors.grey_bg, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        bounces={false}>
        <ActionBoxDependent
          txt={userName}
          planName={planName}
          contentHeight={237}
          screen={'puExpired'}
          activePeriod={activePeriod}></ActionBoxDependent>
        <View>
          <View style={styles.cardMain}>
            <View style={styles.card}>
              <AlertIcon />
              <Text style={styles.subsTxt}>Subscription Expired</Text>
              <Text style={styles.subsContent}>
                Your subscription has expired. For continued access to benefits,
                please renew your plan or call our support center for more
                information
              </Text>
              <Text
                style={[styles.subsContent, {paddingTop: verticalScale(15)}]}>
                Downgrading to a Free Plan will also remove any dependants from
                your current plan. They will be moved to a Free Plan and lose
                access to premium benefits.
              </Text>
              <View style={{width: '100%'}}>
                <NextFillButton
                  adjustable={true}
                  eligible={true}
                  value={'Renew plan'}
                  onPress={()=> navigation.navigate("MemReview")}
                />
              </View>
              <View  style={{width:"100%"}}>
                <OutlineIcon onPress={handleModal} value={'Downgrade to Free Plan'} />
              </View>
            </View>
            <CommonDependant activePeriod={activePeriod} />
            {data?.dependent_users?.length > 0 ? (
              <>
              {/* // <Pressable onPress={() => navigation.navigate('RenewExpired', {id: data?.dependent_users[0]?.user_id})}> */}
              <View>
              <CommonSlots Progressless={true} data={data} />
              </View>
              {/* </Pressable> */}
              </>
            ) : (
              <Pressable onPress={() => navigation.navigate('RenewExpired')}>
                <FreeSlotsButton />
              </Pressable>
            )}
          </View>
          <DowngradeAlert setModalVisible={setVisible} fetching={fetching} modalVisible={visible} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardMain: {
    width: '100%',
    // alignItems: 'center',
    // paddingTop: verticalScale(20),
    padding: moderateScale(16)
  },
  card: {
    width: "100%",
    borderWidth: horizontalScale(1),
    paddingVertical: moderateScale(32),
    paddingHorizontal: moderateScale(12),
    borderRadius: verticalScale(8),
    borderColor: CustomColors.neutralgrey_200,
    backgroundColor: CustomColors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4}, // Offset
    shadowOpacity: 0.1, // Opacity
    shadowRadius: 8, // Blur radius
    // Android shadow properties
    elevation: 4, // Elevation level (can be adjusted)l
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subsTxt: {
    fontFamily: CustomFonts.PoppinsMedium,
    fontWeight: '500',
    fontSize: CustomFontSize.txt_18,
    color: CustomColors.neutral_700,
    paddingVertical: verticalScale(15),
  },
  subsContent: {
    width: '100%',
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: '400',
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
  },
  cont1: {
    width: '100%',
    // paddingHorizontal: horizontalScale(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(0),
  },
  cont2: {flexDirection: 'row', alignItems: 'center'},
  conTxt: {
    color: CustomColors.new_theme_clr,
    fontWeight: '400',
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    paddingHorizontal: horizontalScale(10),
  },
  emptView: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 4,
    width: '100%',
    borderColor: CustomColors.neutral_100,
  },
  listHead: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
  },
  listHeadTitle: {
    paddingHorizontal: horizontalScale(10),
    fontFamily: CustomFonts.PoppinsMedium,
    color: CustomColors.neutral_700,
    fontSize: 18,
    fontWeight: '500',
  },
  titleLft: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: '600',
    fontsize: CustomFontSize.normal,
    color: CustomColors.neutral_700,
  },
  titleRht: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: '400',
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
  },
  subsDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },
  memTxt: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontWeight: '400',
    fontsize: CustomFontSize.normal,
    color: CustomColors.neutral_600,
    paddingHorizontal: horizontalScale(10),
  },
  actBtn: {
    width: 170,
    height: 34,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: CustomColors.new_theme_clr,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actBtnTxt: {
    fontFamily: CustomFonts.PoppinsRegular,
    color: CustomColors.new_theme_clr,
    fontWeight: '400',
    fontSize: CustomFontSize.normal,
    paddingHorizontal: 10,
  },
});
