import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Linking, View } from "react-native";
import { WebView } from "react-native-webview";
import md5 from "md5";
import { useNavigation } from "@react-navigation/native";
import { SENANGPAY_TEST, SENANG_MID, SENANG_SECRET } from "@env";
import axios from "axios";
import CryptoJS from "crypto-js";

const SenangPayPayment = ({ route }) => {
  const navigation = useNavigation();
  const { amount, productName, orderId, email, phone, hash, detail, redirect } =
    route.params;
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(paymentUrl, "urlDataurlDataurlData");
  const baseurl = `${SENANGPAY_TEST}${SENANG_MID}`;

  const generateHash = (secret, detail, amount, orderId) => {
    const data = `${secret}${decodeURIComponent(detail)}${decodeURIComponent(
      amount
    )}${decodeURIComponent(orderId)}`;
    const hash = CryptoJS.HmacSHA256(data, secret).toString();
    return hash;
  };

  const apiHit = async (data) => {
    console.log(data, "urldatadata")
    // const response = await axios.post(baseurl, data);
    // const result = await response.text();
    // Linking.openURL(result);
    const urlData = `${baseurl}?detail=${data?.detail}&amount=${data?.amount}&name=${data?.name}&email=${data?.email}&phone=${data?.phone}&order_id=${data?.order_id}&hash=${data?.hash}`;
    setPaymentUrl(urlData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (paymentUrl) return;

    const paymentData = {
      amount: amount,
      order_id: orderId,
      name: productName,
      email: email,
      phone: phone,
      hash: generateHash(SENANG_SECRET, detail, amount, orderId),
      detail: detail || "package_1",
    };

    const hashString = `${SENANG_SECRET}${paymentData.detail}${paymentData.amount}${paymentData.order_id}`;
    const hashed = md5(hashString);

    setIsLoading(true);
    apiHit(paymentData);

    // fetch(`${baseurl}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(paymentData),
    // }).then((responseData) => {
    //   console.log(responseData,"responseDatajjj")
    //   // setIsLoading(false);
    //   // if (responseData.url) {
    //   //   const urlData = `${baseurl}?detail=${paymentData?.detail}&amount=${paymentData?.amount}&name=${(paymentData?.name)}&email=${(paymentData?.email)}&phone=${(paymentData?.phone)}&order_id=${paymentData?.order_id}&hash=${paymentData?.hash}`;
    //   //   setPaymentUrl(urlData);

    //   //   console.log("Payment URL: response",{hashed}, JSON.stringify(responseData));
    //   // } else {
    //   //   Alert.alert("Payment Error", "Unable to generate payment URL.");
    //   // }
    // });
  }, [paymentUrl, productName, amount, orderId, email, phone, detail]);

  const handleWebViewNavigationStateChange = (navState) => {
    const { url } = navState;
    console.log(
      "Navigating to URL:",
      navState,
      url.includes("Payment_was_successful")
    );

    if (url.includes("Payment_was_successful")) {
      setPaymentUrl(null);
      navigation.navigate(redirect);
    } else if (url.includes("payment_failure_url")) {
      Alert.alert("Payment Failed");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        paymentUrl && (
          <WebView
            source={{ uri: paymentUrl }}
            style={{ flex: 1 }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
          />
        )
      )}
    </View>
  );
};

export default SenangPayPayment;
