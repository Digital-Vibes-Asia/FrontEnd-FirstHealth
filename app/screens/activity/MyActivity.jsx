import { ScrollView, StyleSheet, Text, View } from "react-native";
import FilterBar from "../../common/ActionBar/FilterBar";
import { useEffect, useState } from "react";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/common/Metrics";
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
import NoData from "../../assets/icon/NoDataFile.svg";

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
  console.log(activityData?.activities, "api hit activityData");

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
                  id={activity?.activity_id}
                />
              </View>
            );
          })}
        </View>
      ));
    }else{
    return( <>
      <View
          style={{
            maxWidth: CustomDimensions.screenHeight,
            minHeight: CustomDimensions.screenHeight / 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: moderateScale(16)
          }}
        >
          <NoData
            height={CustomDimensions.icon_height_60}
            width={CustomDimensions.icon_width_60}
          />
          <Text style={styles.headText}>No Activity Recorded</Text>
          <Text style={styles.subText}>
            Any updates or actions will appear here once available
          </Text>
        </View>
      </>)}
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
  headText: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: moderateScale(24),
    fontWeight: "400",
    lineHeight: moderateScale(28),
    color: CustomColors.neutral_700,
  },
  subText: {
    fontFamily: CustomFonts.PoppinsRegular,
    fontSize: moderateScale(14),
    fontWeight: "400",
    lineHeight: moderateScale(18),
    color: CustomColors.neutral_600,
    textAlign: "center"
  },
});

export default MyActivity;