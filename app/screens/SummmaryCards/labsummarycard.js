import { View, StyleSheet, FlatList } from 'react-native';
import { memo } from 'react';
import QueryBoxVrtl from '../../common/SummaryBox/queryboxvrtl';
import LabBoxHztl from '../../common/SummaryBox/labboxhztl';

const RenderItem = memo(({ item, pressed, index, dwld, selected }) => {
  console.log(JSON.stringify(item) + " item...comparinggggg....")

  return (

    <View style={styles.container}>
      <LabBoxHztl
        data={item}
        index={index}
        dwld={dwld}
        selected={selected}
        onPress={pressed}></LabBoxHztl>
    </View>
  );
});

export default function LabSummaryCard({ data, pressed, handlepagination, onRefresh, dwld, selected, refreshing }) {


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
        keyExtractor={(item, index) => item.id}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
