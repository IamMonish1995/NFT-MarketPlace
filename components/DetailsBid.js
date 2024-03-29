import React from "react";
import { View, Text, Image } from "react-native";

import { EthPrice2 } from "./SubInfo";
import { COLORS, SIZES, FONTS } from "../constants";

const DetailsBid = ({ bid }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.base,
      }}
      key={bid.id}
    >
      {/* <Image
        source={bid.image}
        resizeMode="contain"
        style={{ width: 48, height: 48 }}
      /> */}

      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: SIZES.base,
        }}
      > */}
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.small,
            color: COLORS.primary,
          }}
        >{bid.date}
         </Text>
        {/* <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small - 2,
            color: COLORS.secondary,
            marginTop: 3,
          }}
        >
          Payed by {bid.name}
        </Text> */}
      {/* </View> */}
      <EthPrice2 price={bid.price} />
    </View>
  );
};

export default DetailsBid;
