import { StyleSheet, Text, View, Pressable } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/common/Metrics";
import {
  CustomColors,
  CustomFonts,
  CustomFontSize,
} from "../../utils/common/CustomStyles";
import UserIcon from "../../assets/icon/dependantavatar.svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setDepenUserDetails } from "../../store/value";

export default function CommonSlots({ data, Progressless }) {
  const combinedData = data?.dependent_users.concat(data?.invite_user);
  const dispatch = useDispatch();
  const totalEmerCalls =
    data?.user_subscription?.t_emergency_calls || data?.t_emergency_calls || 0;
  const totalNonEmerCalls =
    data?.user_subscription?.t_clinic_calls || data?.t_clinic_calls || 0;
  const remainEmerCalls =
    data?.user_subscription?.r_emergency_calls || data?.r_emergency_calls || 0;
  const remainNonEmerCalls =
    data?.user_subscription?.r_clinic_calls || data?.r_clinic_calls || 0;

  const remainEmerCallConvert = (remainEmerCalls / totalEmerCalls) * 100;
  const remainNonEmerCallConvert =
    (remainNonEmerCalls / totalNonEmerCalls) * 100;

  const navigation = useNavigation();
  return (
    <>
      {combinedData?.map((item, index) => (
        <View style={styles.container} key={index}>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
            onPress={() => {
              dispatch(
                setDepenUserDetails({
                  data: item,
                  referralNo: data?.user_subscription?.referral_no,
                })
              );
              navigation.navigate("dui");
            }}
          >
            <View style={{ width: "12%" }}>
              <UserIcon />
            </View>
            <View
              style={{
                marginLeft: horizontalScale(10),
                width: "58%",
              }}
            >
              {item.reg_id ? null : (
                <View
                  style={[
                    styles.badgeWrapper,
                    {
                      backgroundColor: item?.is_removed
                        ? CustomColors.error_red
                        : CustomColors.smiley_bg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      {
                        color: item?.is_removed
                          ? CustomColors.white
                          : CustomColors.new_theme_clr,
                      },
                    ]}
                  >
                    {item?.is_removed
                      ? "Invite rejected"
                      : item?.is_accepted === 0
                      ? "Invite sent"
                      : item?.is_accepted === 1
                      ? "Linked"
                      : null}
                  </Text>
                </View>
              )}
              <Text style={styles.contentTxt} numberOfLines={1}>
                {item?.is_accepted === 1 || item?.reg_id
                  ? item?.name
                  : item?.is_removed || item?.is_accepted === 0
                  ? item?.email
                    ? item?.email
                    : item?.to_mail
                  : null}
              </Text>
            </View>
            {!Progressless && (
              <View style={styles.circular}>
                <AnimatedCircularProgress
                  size={36}
                  width={5}
                  fill={remainEmerCalls === 0 ? 0 : remainEmerCallConvert}
                  tintColor={CustomColors.errorRed_300}
                  backgroundColor={CustomColors.neutral_200}
                  rotation={270}
                  prefill={100}
                  lineCap="round"
                >
                  {(fill) => <Text>{remainEmerCalls}</Text>}
                </AnimatedCircularProgress>
                <AnimatedCircularProgress
                  size={36}
                  width={5}
                  fill={remainNonEmerCalls === 0 ? 0 : remainNonEmerCallConvert}
                  tintColor={CustomColors.warning_yellow_400}
                  backgroundColor={CustomColors.neutral_200}
                  rotation={360}
                  prefill={100}
                  lineCap="round"
                >
                  {(fill) => <Text>{remainNonEmerCalls}</Text>}
                </AnimatedCircularProgress>
              </View>
            )}
          </Pressable>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(10),
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: CustomColors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Offset
    shadowOpacity: 0.1, // Opacity
    shadowRadius: 8, // Blur radius
    // Android shadow properties
    elevation: 4, // Elevation level (can be adjusted)l
    borderColor: CustomColors.border_color,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentTxt: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontSize: CustomFontSize.normal,
    color: CustomColors.neutral_700,
    marginVertical: moderateScale(2),
  },
  badgeWrapper: {
    marginVertical: moderateScale(2),
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 32,
    alignSelf: "flex-start", // To wrap the text content only
  },
  badgeText: {
    fontFamily: CustomFonts.PoppinsSemiBold,
    fontWeight: "600",
    fontSize: CustomFontSize.txt_10,
  },
  circular: {
    width: "30%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: horizontalScale(5),
  },
});
