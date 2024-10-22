import {View, StyleSheet, FlatList} from 'react-native';
import {memo} from 'react';
import QueryBoxVrtl from '../../common/SummaryBox/queryboxvrtl';

const RenderItem = memo(({item, pressed}) => { 
  console.log(JSON.stringify(item) + " item...comparinggggg....")
  
  return (
    
    <View style={styles.container}>
      <QueryBoxVrtl
        data={item}
        onPress={pressed}></QueryBoxVrtl>
    </View>
  );
});

export default function QueriesSummaryCard({data, pressed, handlepagination, onRefresh}) {

  
  return (
    <>
      <FlatList
        data={data}
        overScrollMode="never"
        bounces={false}
        onEndReached={handlepagination} 
        onEndReachedThreshold={0.1} 
        refreshing={false}
        onRefresh={onRefresh}
        horizontal={false}
        renderItem={({item}) => {
          

          return <RenderItem item={item} pressed={pressed} />
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
