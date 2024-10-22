import {View, StyleSheet, FlatList} from 'react-native';
import {memo} from 'react';
import NotificationBox from '../../common/SummaryBox/notificationbox';
import {CustomColors} from '../../utils/common/CustomColors';

const RenderItem = memo(({item, pressed}) => {
  return (
    <View style={styles.container}>
      <NotificationBox
        
        data={item}
        onPress={pressed}></NotificationBox>
    </View>
  );
});

export default function NotifySummaryCard({data, pressed, handlepagination, onRefresh, refreshing}) {
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
        renderItem={({item}) => <RenderItem item={item} pressed={pressed} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) =>index}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
