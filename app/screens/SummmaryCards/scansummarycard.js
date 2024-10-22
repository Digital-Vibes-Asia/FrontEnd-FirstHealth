import { View, StyleSheet, FlatList } from 'react-native';
import { memo } from 'react';

import ScanBoxHztl from '../../common/SummaryBox/scanboxhztl';

const RenderItem = memo(({ item, pressed, index, dwld, selected }) => {
  console.log(JSON.stringify(item) + " item...comparinggggg....")

  return (

    <View style={styles.container}>
      <ScanBoxHztl
        data={item}
        index={index}
        dwld={dwld}
        selected={selected}
        onPress={pressed}></ScanBoxHztl>
    </View>
  );
});

export default function ScanSummaryCard({ data, pressed, handlepagination, onRefresh, dwld, selected, refreshing }) {


  return (
    <>
      <FlatList
        data={data}
        overScrollMode="never"
        bounces={true}
        onEndReached={handlepagination}
        onEndReachedThreshold={0.1}
        refreshing={refreshing}
        onRefresh={onRefresh}
        horizontal={false}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} pressed={pressed} index={index} dwld={dwld} selected={selected} />
        }
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.report_id}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
