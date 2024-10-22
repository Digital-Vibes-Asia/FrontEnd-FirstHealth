import { View, Text, StyleSheet, FlatList, Image, Pressable, ScrollView } from 'react-native';
import { memo } from 'react';
import PrescriptionBoxHztl from '../../common/SummaryBox/prescriptionboxhztl';

import HomeNoData from '../../common/textbox/homenodata';
import HomeProgress from '../../common/textbox/homeprogress';


const RenderItem = memo(({ item, pressed, index }) => {


  return (
    <View style={[styles.container]}>
      <PrescriptionBoxHztl
        data={item}
        onPress={pressed}></PrescriptionBoxHztl>
    </View>
  );
});

export default function PrescriptionQuickSummary({ data, pressed, progress }) {
  return (
    <>
      {!progress ?
        data && data.length > 0 ?
          <View style={{ maxHeight: 300,}}>
            <FlatList
              data={data}
              overScrollMode="never"
              bounces={false}
              // numColumns={2}
              horizontal={true}
              renderItem={({ item, index }) => <RenderItem index={index + 1} item={item} pressed={pressed} />}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
            />
          </View> : <HomeNoData txt={"No Data Found"}></HomeNoData>
        : <HomeProgress></HomeProgress>

      }
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    marginRight: 10,
    justifyContent:"space-between",
  
    // width: "40%",

  },
});
