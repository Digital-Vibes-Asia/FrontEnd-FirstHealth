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

export default function PurposeSummaryCard({ data, onPress }) {


  return (
    <>
      <View style={styles.container}>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          scrollEventThrottle={16}
          bounces={false}>
          {
            data.map((items, index) => {
              return (
                <>
                  <Pressable style={styles.txt_container} key={items.id} onPress={() => {
                    onPress(items)
                  }}>
                    <Text style={styles.boldtextstyle}>{items.purpose}</Text>
                  </Pressable>
                </>
              );
            })
          }
        </ScrollView>
      </View>




    </>

  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
    height: 100,

    borderColor: CustomColors.bordercolour,
    padding: 10,

  },

  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "flex-start",
    padding: 5,
  },
  txt_container: {  borderBottomWidth: 1, borderColor: CustomColors.bordercolour, marginBottom: 5, }

});
