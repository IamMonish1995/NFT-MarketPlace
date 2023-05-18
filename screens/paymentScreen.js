import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { FocusedStatusBar, RectButton } from "../components";

const Payments = ({ route, navigation }) => {
  const { amount } = route.params;
  //   const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  //   if (showPaymentScreen) {
  //     const razorpayCheckoutURL =
  //       `https://api.razorpay.com/v1/checkout/embedded?` +
  //       `key_id=rzp_test_qYweUy4ve385yD` +
  //       `&amount=${amount*100}` +
  //       `&currency=INR` +
  //       `&name=Sample%20App` +
  //       `&description=Sample%20Description` +
  //       `&prefill[name]=John%20Doe` +
  //       `&prefill[contact]=9999999999` +
  //       `&callback_url=http://localhost:8080/paymentcallback`;

  //     return (
  //       <View style={styles.container}>
  //         <WebView source={{ uri: razorpayCheckoutURL }} style={styles.webview} />
  //       </View>
  //     );
  //   }

  //   return (
  //     <SafeAreaView style={{ flex: 1 }}>
  //       <FocusedStatusBar
  //         barStyle="dark-content"
  //         backgroundColor="transparent"
  //         translucent={true}
  //       />
  //       <View
  //         style={{
  //           width: "100%",
  //           height:"100%",
  //           position: "absolute",
  //           bottom: "3%",
  //           paddingVertical: SIZES.font,
  //           justifyContent: "center",
  //           alignItems: "center",
  //           backgroundColor: "rgba(255,0,255,0.5)",
  //           zIndex: 100000,
  //         }}
  //       > <RectButton
  //           handlePress={() =>{setShowPaymentScreen(true)}}
  //           text={`Pay Now ${amount}`}
  //           minWidth={170}
  //           fontSize={SIZES.large}
  //           {...SHADOWS.dark}
  //         />

  //         </View>
  //     </SafeAreaView>
  //   );

  const [paymentId, setPaymentId] = useState("order_Lqkf8OwJZfGsVL");

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/payment/razorpaypayments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount}),
      });
      const { id } = await response.json();
      setPaymentId(id);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const options = {
          key: "rzp_test_qYweUy4ve385yD",
          amount: amount*100,
          currency: "INR",
          name: "PMS",
          description: "Test Payment",
          image: "https://www.drupal.org/files/project-images/razorpay.png",
          order_id: paymentId,
          handler: function (response) {
            const order_id = response.razorpay_order_id;
            const payment_id = response.razorpay_payment_id;
            const signature = response.razorpay_signature;
            fetch("/paymentsuccess", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount,
                order_id,
                payment_id,
                signature,
              }),
            })
              .then((response) => response.text())
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.error(error);
              });
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          notes: {
            address: "123 Main St",
            zipcode: "123456",
          },
          // "theme": {
          //   "color": "#F37254"
          // }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <FocusedStatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            bottom: "3%",
            paddingVertical: SIZES.font,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,0,255,0.5)",
            zIndex: 100000,
          }}
        ><RectButton
            handlePress={handlePayment}
            text={`Pay Now ${amount}`}
            minWidth={170}
            fontSize={SIZES.large}
            {...SHADOWS.dark}
          />
        </View>
      </SafeAreaView>
      {/* <Button onClick={handlePayment}>Pay With RazorPay</Button> */}
    </>
  );
};
// const styles = StyleSheet.create({
//   container: {
//   width:"100%",
//   height:"100%"
//   },
//   webview: {
//   width:"100%",
//   height:"100%"
//   },
//  });

export default Payments;
