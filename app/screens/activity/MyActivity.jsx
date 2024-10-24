import { ScrollView, StyleSheet, Text, View } from "react-native";
import FilterBar from "../../common/ActionBar/FilterBar";
import { useEffect, useState } from "react";
import { horizontalScale, verticalScale } from "../../utils/common/Metrics";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import ActivityCard from "../../common/Card/ActivityCard";
import { usePostMutation } from "../../store/api";
import { UrlBase } from "../../utils/common/urlbase";
import { useSelector } from "react-redux";
import moment from "moment";
import Progressing from "../../common/Progress/Progressing";

const categorizeActivitiesByActivityDate = (activities) => {
  const categorized = {};

  activities.forEach((act) => {
  const dateKey = moment(act?.activity?.created_at).format('YYYY-MM-DD');
  if (!categorized[dateKey]) {
      categorized[dateKey] = [];
    }
    categorized[dateKey].push(act);
  });

  return categorized;
};

const MyActivity = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const { activityPayload } = useSelector((state) => state?.operation);
  const [getActivity, { data: activityData, error, isLoading }] =
    usePostMutation();
  console.log(isLoading, "api hit ");

  const Divider = ({ text }) => {
    return (
      <View style={styles.sepContainer}>
        <Text style={styles.separatorText}>{text}</Text>
        <View style={styles.line} />
      </View>
    );
  };

  useEffect(() => {
    const payload = {
      orderBy: activityPayload?.orderBy?.toString(),
    };
    if (activityPayload?.filterBy?.length > 0)
      payload.filterBy = activityPayload?.filterBy?.toString();
    getActivity({
      data: payload,
      url: UrlBase.GETACTIVITY,
    });
    console.log(payload, "Payload Data");
  }, [activityPayload]);

  const renderActivities = () => {
    if (activityData?.activities?.length > 0) {
      const categorizedActivities = categorizeActivitiesByActivityDate(activityData.activities);

      return Object.keys(categorizedActivities).map((dateKey, index) => (
        <View key={index}>
          <Divider text={moment(dateKey).format('MMMM Do YYYY')} />
          {categorizedActivities[dateKey].map((act, actIndex) => {
            const { activity, user } = act;
            return (
              <View
                key={actIndex}
                style={{ marginVertical: verticalScale(8) }}
              >
                <ActivityCard
                  headText={activity?.activity}
                  subHead={moment(activity?.created_at).format('h:mm A')}
                  desc={user?.name}
                />
              </View>
            );
          })}
        </View>
      ));
    }
    return( <>
      <View style={{flex: 1,height: "100%", MarginTop: "25%"}}>
        <View style={{display: "flex",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.separatorText}>No data found</Text>
        </View>
      </View>
      </>)
  };

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <FilterBar
        txt={"Activity"}
        icon={"activity"}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
      />
      {isLoading ? (
        <View
          style={{
            height: CustomDimensions.screenHeight,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: CustomDimensions.screenWidth,
          }}
        >
          <Progressing />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView style={styles.Scrollcontainer}>
            {renderActivities()}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Scrollcontainer: {
    marginVertical: verticalScale(28),
    marginHorizontal: horizontalScale(15),
  },
  container: {
    backgroundColor: "white",
    height: CustomDimensions.screenHeight,
  },
  sepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: verticalScale(1.5),
    backgroundColor: CustomColors.bordercolour,
  },
  separatorText: {
    marginHorizontal: horizontalScale(10),
    marginLeft: 0,
    fontSize: verticalScale(12),
    color: CustomColors.neutral_500,
    fontFamily: CustomFonts.PoppinsExtraBold,
  },
});

export default MyActivity;