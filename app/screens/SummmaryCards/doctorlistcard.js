import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Keyboard,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { memo } from 'react';
import { CustomColors } from '../../utils/common/CustomColors';

import AppoinmentTitle from '../../common/TittleBox/appoinmenttitle';
import SearchDrBox from '../../common/SummaryBox/searchdrbox';
import WelcomeBox from '../../common/TittleBox/welcomebox';

export default function DoctorListCard({ data, pressed, text, progressBar,handlescroll }) {

  
  return (
    <>
      {!progressBar ?
        data.length != 0 ?
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            scrollEventThrottle={16}
            onScroll={handlescroll}
            bounces={false}>
            {text.length == 0 && (
              <View style={styles.gap_20}>
                <WelcomeBox txt={'Recent List'}></WelcomeBox>
              </View>
            )}
            {

              data.map((items, index) => {
                return (
                  <>
                    <View style={styles.container} key={index}>
                      <SearchDrBox data={items} onPress={pressed}></SearchDrBox>
                    </View>
                  </>
                );
              })
            }
          </ScrollView>
          :
          <View style={styles.nodatafoundcontainer}>
            <Text style={styles.boldtextstyle}>No Data Found</Text>
          </View>

        :
        <View style={styles.nodatafoundcontainer}>
          <ActivityIndicator color={CustomColors.actionbar_clr} size={"larg"}></ActivityIndicator>
        </View>

      }

    </>

  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10,
  },
  gap_20: { marginTop: 20 },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 14,
    fontWeight: 'bold',
  },
  nodatafoundcontainer: {
    justifyContent: "center", alignItems: 'center', flex: 1,

  }
});
