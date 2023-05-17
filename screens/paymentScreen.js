import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  StyleSheet
} from "react-native";
import { WebView } from "react-native-webview";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import {
  FocusedStatusBar, RectButton,
} from "../components";

const Payments = ({ route, navigation }) => {
  const { amount } = route.params;
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  if (showPaymentScreen) {
    const razorpayCheckoutURL =
      `https://api.razorpay.com/v1/checkout/embedded?` +
      `key_id=rzp_test_qYweUy4ve385yD` +
      `&amount=${amount*100}` +
      `&currency=INR` +
      `&name=Sample%20App` +
      `&description=Sample%20Description` +
      `&prefill[name]=John%20Doe` +
      `&prefill[contact]=9999999999` +
      `&callback_url=http://localhost:8080/paymentcallback`;

    return (
      <View style={styles.container}>
        <WebView source={{ uri: razorpayCheckoutURL }} style={styles.webview} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View
        style={{
          width: "100%",
          height:"100%",
          position: "absolute",
          bottom: "3%",
          paddingVertical: SIZES.font,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,0,255,0.5)",
          zIndex: 100000,
        }}
      >
        {/* <Text
          style={{
            fontSize: SIZES.font,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
          }}
        >
          {amount}
        </Text> */}

        <RectButton
          handlePress={() =>{setShowPaymentScreen(true)}}
          text={`Pay Now ${amount}`}
          minWidth={170}
          fontSize={SIZES.large}
          {...SHADOWS.dark}
        />

        </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
  width:"100%",
  height:"100%"
  },
  webview: {
  width:"100%",
  height:"100%"
  },
});

export default Payments;
