import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';

import { memo } from 'react';
import { CustomColors } from '../../utils/common/CustomColors';
import AppoinmentBox from '../../common/SummaryBox/appoinmentbox';
import HomeNoData from '../../common/textbox/homenodata';
import HomeProgress from '../../common/textbox/homeprogress';

const RenderItem = memo(({ item, onPress }) => {

  return (
    <View style={styles.container}>
      <AppoinmentBox
        data={item}
        onPress={onPress}></AppoinmentBox>
    </View>

  );
});

export default function ApptQuickSummary({ data, onPress, progress }) {
  console.log(JSON.stringify(data) + " Item....")
  return (
    <>
      <View style={styles.flatlist_container}>

        {!progress ? data &&
          data.length > 0 ?
          <FlatList
            data={data}
            overScrollMode="never"
            bounces={false}
         
            horizontal={false}
            renderItem={({ item }) => <RenderItem item={item} onPress={onPress} />}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item?.id}
          /> : <HomeNoData txt={"No Appointments Scheduled"}></HomeNoData>
          : <HomeProgress></HomeProgress>
        }
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  flatlist_container: {
    maxHeight: 150,
  },
});
