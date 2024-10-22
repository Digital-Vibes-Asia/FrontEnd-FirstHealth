import {View, StyleSheet, FlatList} from 'react-native';
import {memo} from 'react';

import NotesBoxVrtl from '../../common/SummaryBox/notesboxvrtl';

const RenderItem = memo(({item,index, pressed}) => { 
  
  return (
    <View style={styles.container}>
      <NotesBoxVrtl
        data={item}
        index={index}
        onPress={pressed}></NotesBoxVrtl>
    </View>
  );
});

export default function NotesSummaryCard({data, pressed, handlepagination, onRefresh}) {

  
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
        renderItem={({item, index}) => {
          

          return <RenderItem item={item} index={index} pressed={pressed} />
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
