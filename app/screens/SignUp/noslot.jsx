import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text

} from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import SigninButton from '../../common/Button/signinbutton';
import MailSuccessTxt from '../../common/TittleBox/mailsuccesstxt';
import { useSelector } from 'react-redux';
import RegisterButton from '../../common/Button/registerbutton';
import AlertIcon from '../../common/AlertBox/alerticon';
import AlertText from '../../common/AlertBox/alerttext';
import ThemeSuccessText from '../../common/TittleBox/themesuccesstxt';
import SSimpleText from '../../common/TittleBox/ssimpletxt';
import SmallText from '../../common/TittleBox/smalltext';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/common/Metrics';
import ThemeAlertIcon from '../../common/AlertBox/themealerticon';
import MediumTitleTxt from '../../common/TittleBox/mediumtitiletxt';
import { CustomColors, CustomFontSize, CustomFonts } from '../../utils/common/CustomStyles';
import BackHomeButton from '../../common/Button/backhomebutton';




const StartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function NoSlot({ route }) {
  const navigation = useNavigation();
  const setRedux = useDispatch();

  console.log(JSON.stringify(route) + " route...")

  const mail = useSelector(
    state => state.operation?.temp_data?.mail,
  );





  const [formState, dispatch] = useReducer(StartReducer, {
    mail: route?.params?.mail


  });

  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };



  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bounces={true}>
        <View style={styles.container}>


          <View style={{ marginTop: "30%" }}>
            <ThemeAlertIcon></ThemeAlertIcon>
          </View>
          <View style={{ marginTop: "5%" }}>
            <MediumTitleTxt txt={"No more Slots Available!"}></MediumTitleTxt>
          </View>
          <View style={{ marginTop: "2%" }}>
            <Text style={styles.normaltxt}> It is look like the plan you are being invited to, <Text style={styles.boldltxt}>{route?.params?.plan}</Text> has reached its limit for adding new adult members. unfortunately there are no available slots at this time </Text>
            <View style={{ marginTop: "2%" }}>
              <Text style={styles.normaltxt}> Please Contact the account holder for further assistance or contact <Text style={[styles.boldltxt, { color: CustomColors.new_theme_clr }]}>First Health Customer Support</Text> for Support</Text>
            </View>

          </View>

        </View>

      </ScrollView>
      <>
        <BackHomeButton value={"Go back"} onPress={() => {
          navigation.goBack()
        }}></BackHomeButton>


      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(20)

  },
  alertcontainer: { marginTop: "10%", marginHorizontal: "5%" },
  logocontainer: { marginTop: "10%" },
  margin_5: {
    marginTop: "5%"
  },
  subtxtcontainer: {
    marginHorizontal: "10%",
    marginTop: "5%",

  },

  normaltxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsRegular,
    lineHeight: verticalScale(18),
    textAlign: "center"
  },
  boldltxt: {
    color: CustomColors.neutral_700,
    fontSize: CustomFontSize.normal,
    fontFamily: CustomFonts.PoppinsSemiBold,
    lineHeight: verticalScale(18),
    textAlign: "center"
  }


});
