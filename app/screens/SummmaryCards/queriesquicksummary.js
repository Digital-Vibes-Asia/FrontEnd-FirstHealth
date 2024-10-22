import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { memo } from 'react';
import QueryBoxHztl from '../../common/SummaryBox/queryboxhztl';

import HomeNoData from '../../common/textbox/homenodata';
import HomeProgress from '../../common/textbox/homeprogress';



const RenderItem = memo(({ item, pressed }) => {
  return (
    <View style={styles.container}>
      <QueryBoxHztl
        data={item}
        onPress={pressed}></QueryBoxHztl>
    </View>
  );
});

export default function QueriesQuickSummary({ data, pressed, progress }) {
  return (
    <>
      {!progress ?
         data && data.length > 0 ?
          <FlatList
            data={data}
            overScrollMode="never"
            bounces={false}
            horizontal={true}
            renderItem={({ item }) => <RenderItem item={item} pressed={pressed} />}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}
          /> : <HomeNoData txt={"No Queries Found"}></HomeNoData>
        : <HomeProgress></HomeProgress>

      }
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
});
