import { View } from "react-native";
import { useGetQuery } from "../../store/api";
import { UrlBase } from "../../utils/common/urlbase";
import FreeUserScreen from "./freeUserScreen";
import SubscriptionDependantUser from "./subscriptionDependantUser/subscriptionDependantUser";
import PrincipalUsrQualifyingAndActive from "./subscriptionPrincipalUser/principalUsrQualifyingAndActive";
import { useCallback, useEffect, useMemo } from "react";
import PrincipalUserExpired from "./subscriptionPrincipalUser/PrincipalUserExpired";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSlotsCount, setSubscriptionData } from "../../store/value";

export default function SubscriptionIndex() {
  const setRedux = useDispatch();
  const {
    data: subscriptionData,
    error: subsError,
    refetch,
  } = useGetQuery(UrlBase.GETSUBSPLAN);

  const qualifyingPeriod =
    subscriptionData?.user_subscription?.is_qualifying_period;
  const freePlan = subscriptionData?.user_subscription?.free_plan;
  const isDependant = subscriptionData?.user_subscription?.is_dependent;

  const isExpired = useMemo(() => {
    return subscriptionData?.user_subscription?.is_plan_expired;
  }, [subscriptionData]);

  useEffect(() => {
    setRedux(
      setSlotsCount({
        slotsCount: subscriptionData?.user_subscription?.slot_count,
      })
    );
  }, [subscriptionData]);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      {freePlan === true ? (
        <FreeUserScreen subsData={subscriptionData} />
      ) : isDependant ? (
        <SubscriptionDependantUser data={subscriptionData} fetching={refetch} />
      ) : isExpired ? (
        <PrincipalUserExpired data={subscriptionData} fetching={refetch} />
      ) : qualifyingPeriod === true || !qualifyingPeriod ? (
        <PrincipalUsrQualifyingAndActive
          data={subscriptionData}
          fetching={refetch}
        />
      ) : null}
    </View>
  );
}
