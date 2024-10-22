import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';

import { memo } from 'react';
import { CustomColors } from '../../utils/common/CustomColors';
import AppoinmentBox from '../../common/SummaryBox/appoinmentbox';
import AppoinmentFilter from '../../common/TittleBox/appoinmentfilter';
import WelcomeBox from "../../common/TittleBox/welcomebox"
import Progressing from "../../common/Progress/Progressing"
import NoDataFound from "../../common/textbox/nodatadoundbox"


const RenderItem = memo(({ item, pressed }) => {
  return (
    <View style={styles.container}>
      <AppoinmentBox
        data={item}
        onPress={pressed}></AppoinmentBox>
    </View>
  );
});

export default function ApptSummaryCard({ data, pressed, handlepagination, onPress1, onPress2, onRefresh,refreshing }) {
  console.log(JSON.stringify(data), '...Appointment Summary...');
  return (
    <>
      <FlatList
        data={data?.summary}
        overScrollMode="never"
        bounces={true}
        horizontal={false}
        onEndReached={handlepagination}
        onEndReachedThreshold={0.1}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => <RenderItem item={item} pressed={pressed} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={
          <View style={styles.gap_20}>
            <AppoinmentFilter value1={data?.date} value2={data?.purpose} onPress1={onPress1} onPress2={onPress2}></AppoinmentFilter>
            <View style={styles.gap_10}>
              <WelcomeBox txt="My Schedule"></WelcomeBox>
            </View>
            {data.progressBar ?
              <Progressing></Progressing> :
              !data?.summary.length > 0 ? <NoDataFound txt={"No Data Found"}></NoDataFound> : <View></View>}
          </View>
        }
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  gap_20: { marginBottom: 20 },
  gap_10: { marginTop: 20 },
});
