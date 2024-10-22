import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ViewBar from "../../common/ViewBar/ViewBar";
import { ActionList } from "../../common/ListItem/ActionList";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import LogoutAlert from "../../common/Dialogs/LogoutAlert";
import CloseAccountAlert from "../../common/Dialogs/CloseAccountAlert";
import { Image } from "react-native";
import { horizontalScale, verticalScale } from "../../utils/common/Metrics";
import { useSelector } from "react-redux";

const MyAccount = () => {
  const navigation = useNavigation();
  const { user_name } = useSelector((state) => state.operation);
  const [modalVisible, setModalVisible] = useState(false);
  const [closeAccount, setCloseAccount] = useState(false);

  return (
    <>
      <View>
        <ViewBar
          head={"Welcome Back"}
          subHead={user_name}
          subWeight={CustomFontSize.title}
          headWeight={CustomFontSize.normal_12}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={{ gap: 32, marginHorizontal: 5 }}>
            <View>
              <Text style={styles.headText}>My Account</Text>
              <View style={{ width: CustomDimensions.screenWidth }}>
                <ActionList
                  title={"My Profile"}
                  icon={"right_arrow"}
                  onPress={() => navigation.navigate("MyProfile")}
                />
                {/* <ActionList
                      title={"Payment Method"}
                      icon={"right_arrow"}
                      onPress={() => navigation.navigate("CloseAccount")}
                    /> */}
                <ActionList
                  title={"Logout"}
                  icon={"logout"}
                  onPress={() => setModalVisible(true)}
                />
                <ActionList
                  title={"Close My Account"}
                  icon={"trash"}
                  onPress={() => setCloseAccount(true)}
                />
              </View>
            </View>

            <View style={{ marginTop: 0 }}>
              <Text style={styles.headText}>General</Text>
              <View style={{ width: CustomDimensions.screenWidth }}>
                <ActionList
                  title={"FAQ"}
                  icon={"right_arrow"}
                  onPress={() => navigation.navigate("FAQ")}
                />
                <ActionList
                  title={"Terms & Conditions"}
                  icon={"right_arrow"}
                  onPress={() => navigation.navigate("TermsAndCondition")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <LogoutAlert
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <CloseAccountAlert
        setModalVisible={setCloseAccount}
        modalVisible={closeAccount}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headText: {
    fontSize: CustomFontSize.title,
    fontFamily: CustomFonts.PoppinsMedium,
    lineHeight: verticalScale(22),
    color: CustomColors.neutral_700,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  button: {
    borderRadius: verticalScale(20),
    padding: verticalScale(10),
    elevation: 2,
  },
  scrollContainer: {
    // paddingBottom: verticalScale(20),
    marginHorizontal: horizontalScale(10),
  },
  overlay: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default MyAccount;
