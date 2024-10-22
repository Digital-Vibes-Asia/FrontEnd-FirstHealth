import { View, StyleSheet, FlatList } from 'react-native';
import { memo } from 'react';
import QueryBoxVrtl from '../../common/SummaryBox/queryboxvrtl';
import FullQn from '../../common/SummaryBox/fullqn';
import ReplyBox from '../../common/SummaryBox/replybox';

const RenderItem = memo(({ item, pressed }) => {
  console.log(JSON.stringify(item), 'Item....');
  return (
    <View style={styles.container}>
      <ReplyBox
        data={item}
        onPress={() => {
          console.log('Pressed...');
        }}></ReplyBox>
    </View>
  );
});

export default function SingleQueryCard({ data, pressed, onRefresh, refershing }) {

  console.log(JSON.stringify(data)+ " Data...Item")


  return (
    <>
      <FlatList
        data={ data?.doctors}
        overScrollMode="never"
        bounces={true}
        refreshing={refershing}
        onRefresh={onRefresh}

        ListHeaderComponent={
          <View style={styles.qn_container}>
            <FullQn
              title={data?.singlequery?.title}
              fullqn={data?.singlequery?.query}
              time={data?.singlequery?.timeAgo}></FullQn>
            {/* {data?.singlequery?.reply_to_query  &&
              <View style={styles.web_container}>
                <ReplyBox
                  data={{content : data?.singlequery?.reply_to_query,
                    uri:"",
                  }}
                  onPress={() => {
                    console.log('Pressed...');
                  }}></ReplyBox>
              </View>
            } */}
          </View>
        }
        horizontal={false}
        renderItem={({ item }) => {
         
          return <RenderItem item={item} pressed={pressed} />;
          
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  qn_container: {
    marginBottom: 10,
  },
  web_container: {
    marginTop: 10,
  },
});
