import {View, StyleSheet, FlatList} from 'react-native';
import {memo} from 'react';
import QueryBoxVrtl from '../../common/SummaryBox/queryboxvrtl';
import FullQn from '../../common/SummaryBox/fullqn';
import ReplyBox from '../../common/SummaryBox/replybox';
import DateSlotBox from '../../common/PickBox/dateslotbox';

const RenderItem = memo(({item, pressed}) => {
  console.log(JSON.stringify(item), 'Item....');
  return (
    <View style={styles.container}>
      <DateSlotBox data={item} onPress={pressed}></DateSlotBox>
    </View>
  );
});

export default function DateSlotBoxCard({data, pressed}) {
  return (
    <>
      <FlatList
        data={data}
        overScrollMode="never"
        bounces={false}
        horizontal={true}
        renderItem={({item}) => {
          return <RenderItem item={item} pressed={pressed} />;
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.reply_id}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  qn_container: {
    marginBottom: 10,
  },
});
