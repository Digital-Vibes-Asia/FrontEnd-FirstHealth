import React, { useState, useRef, useEffect, useReducer } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import SortBy from "../../assets/icon/sortBy.svg";
import Person from "../../assets/icon/filterPerson.svg";
import FilterButton from "../../assets/icon/FilterButton.svg";
import FilterClose from "../../assets/icon/FilterClose.svg";
import {
  CustomColors,
  CustomDimensions,
  CustomFonts,
} from "../../utils/common/CustomStyles";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/common/Metrics";
import FilterPick from "../textinputbox/filterPick";
import CheckFilter from "../textinputbox/checkFilter";
import { clearActivityPayload, setSortBy } from "../../store/value";
import { useDispatch, useSelector } from "react-redux";
import { useGetQuery } from "../../store/api";
import { UrlBase } from "../../utils/common/urlbase";
import { ScrollView } from "react-native";

const PIReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

const FilterModal = ({ modalVisible, setModalVisible }) => {
  const setRedux = useDispatch();
  const [dependant, setDependant] = useState({
    user_subscription: {
      id: 6,
      user_id: 1,
      subscription_id: 1,
      referral_no: "FH150938",
      referral_id: null,
      is_accepted: 1,
      is_qualifying_period: false,
      count: 3,
      adult_count: 2,
      senior_count: 1,
      child_count: 2,
      free_plan: false,
      is_dependent: false,
      is_plan_expired: false,
      is_removed: false,
      t_emergency_calls: 2,
      r_emergency_calls: 0,
      t_clinic_calls: 2,
      r_clinic_calls: 0,
      start_date: "2024-09-13",
      end_date: "2025-09-13",
      is_active: 1,
      created_at: "2024-09-01T13:16:41.000000Z",
      updated_at: "2024-09-13T09:35:25.000000Z",
      name: "Anbu M",
      subscription_master: {
        id: 1,
        plan: "Adult Membership",
        price: 100,
        eligible: 1,
        free_plan: 0,
        usual_price: 350,
        child: 2,
        senior: 1,
        adult: 1,
        key_benefits: '{"emergency_calls": 2, "clinic_calls": 2}',
        created_at: "2024-08-13T12:15:38.000000Z",
        updated_at: "2024-08-13T12:15:38.000000Z",
      },
    },
    dependent_users: [
      {
        id: 14,
        user_id: 11,
        subscription_id: 1,
        referral_no: null,
        referral_id: 1,
        is_accepted: 1,
        is_qualifying_period: true,
        count: 3,
        adult_count: 0,
        senior_count: 0,
        child_count: 0,
        free_plan: false,
        is_dependent: true,
        is_plan_expired: false,
        is_removed: false,
        t_emergency_calls: 2,
        r_emergency_calls: 0,
        t_clinic_calls: 2,
        r_clinic_calls: 0,
        start_date: "2024-09-12",
        end_date: "2025-09-12",
        is_active: 1,
        created_at: "2024-09-10T08:10:37.000000Z",
        updated_at: "2024-09-12T08:11:40.000000Z",
        dependent_name: "tester123 eucto123",
        subscription_master: {
          id: 1,
          plan: "Adult Membership",
          price: 100,
          eligible: 1,
          free_plan: 0,
          usual_price: 350,
          child: 2,
          senior: 1,
          adult: 1,
          key_benefits: '{"emergency_calls": 2, "clinic_calls": 2}',
          created_at: "2024-08-13T12:15:38.000000Z",
          updated_at: "2024-08-13T12:15:38.000000Z",
        },
      },
    ],
  });

  const {
    data: subscriptionData,
    error: subsError,
    refetch,
  } = useGetQuery(UrlBase.GETSUBSPLAN);
  console.log(subscriptionData, "subscriptionData act");
  const slideAnim = useRef(
    new Animated.Value(-Dimensions.get("window").height)
  ).current;

  const [formState, dispatch] = useReducer(PIReducer, {
    sortByASC: false,
  });

  const handleChange = (fields) => {
    dispatch({ type: "SET_FIELD", fields });
  };

  function toggleDiabetes(id) {
    console.log(id, "toggle id ");
    switch (id) {
      case 1:
        handleChange({ sortByASC: true });
        break;
      case 2:
        handleChange({ sortByASC: false });
        break;
    }
  }

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get("window").height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  useEffect(() => {
    setRedux(setSortBy(formState.sortByASC ? "ASC" : "DESC"));
  }, [formState]);

  const hideModal = () => setModalVisible(false);
  console.log(subscriptionData, "subscriptionData8787");
  return (
    <>
      <Modal transparent visible={modalVisible} animationType="none">
        <TouchableOpacity style={styles.overlay} onPress={hideModal}>
          <View />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.modalContainer,

            {
              transform: [{ translateY: slideAnim }],
              top: Platform.OS === "android" ? "8%" : "12%",
            },
          ]}
        >
          <View style={styles.whole_container}>
            <View style={styles.modalContent}>
              <View style={styles.inline}>
                <SortBy
                  width={CustomDimensions.icon_width_20}
                  height={CustomDimensions.icon_height_20}
                ></SortBy>
                <Text style={styles.inlineTxt}>Sort by</Text>
              </View>
              <View style={{ marginVertical: verticalScale(8) }}>
                <FilterPick
                  toggle={toggleDiabetes}
                  variable={"Latest First"}
                  variable2={"Oldest First"}
                  value={formState.sortByASC}
                  value2={!formState.sortByASC}
                />
              </View>

              {subscriptionData?.dependent_users?.length > 0 && (
                <View
                  style={[styles.inline, { justifyContent: "space-between" }]}
                >
                  <View style={styles.inline}>
                    <Person
                      width={CustomDimensions.icon_width_20}
                      height={CustomDimensions.icon_height_20}
                    ></Person>
                    <Text style={styles.inlineTxt}>Filter by member</Text>
                  </View>
                  <Pressable onPress={() => setRedux(clearActivityPayload({}))}>
                    <Text style={{ color: CustomColors.new_theme_clr }}>
                      clear selection
                    </Text>
                  </Pressable>
                </View>
              )}

              <ScrollView
                style={{ marginTop: verticalScale(8), height: "50%", flex: 1 }}
              >
                <CheckFilter
                  variable={subscriptionData?.user_subscription?.name}
                  value={subscriptionData?.user_subscription?.user_id}
                />
                {subscriptionData?.dependent_users?.map((users, index) => {
                  return (
                      <CheckFilter
                        variable={users?.name}
                        value={users?.user_id}
                        key={index}
                      />
                  );
                })}
              </ScrollView>

              <Pressable
                onPress={hideModal}
                style={[
                  styles.filterContainer,
                  { top: Platform.OS === "android" ? "-6%" : "-15%" },
                ]}
              >
                {modalVisible ? (
                  <FilterClose
                    width={CustomDimensions.icon_width_70}
                    height={CustomDimensions.icon_height_70}
                  ></FilterClose>
                ) : (
                  <FilterButton
                    width={CustomDimensions.icon_width_70}
                    height={CustomDimensions.icon_height_70}
                  ></FilterButton>
                )}
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  inline: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inlineTxt: {
    marginLeft: horizontalScale(6),
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontSize: verticalScale(14),
    lineHeight: verticalScale(18),
    color: CustomColors.neutral_700,
  },
  modalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "white",
    elevation: 1,
  },
  modalContent: {
    padding: verticalScale(16),
    paddingBottom: 0,
    backgroundColor: "white",
    gap: verticalScale(4),
  },
  filterContainer: {
    position: "absolute",
    right: 0,
  },
  // whole_container: { backgroundColor: "#000", flex: 1, opacity:0.9}
});

export default FilterModal;