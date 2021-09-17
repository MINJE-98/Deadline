import React from "react";
import { Text, View, Modal, ActivityIndicator } from "react-native";
import { modalstyles } from "../styles/light/styles";

export default function ActionModal(props) {
  return (
    // <Modal animationType={"slide"} transparent={true}>
      <View style={[modalstyles.defaultStyle]}>
        {/** VIEW */}
        <View style={[modalstyles.defaultBox, { width: 340 }]}>
          {/** HEAD */}
          <View style={{ alignItems: "center" }}>
            <Text style={modalstyles.defaultFont}>{props.mainMessage}</Text>
            {props.exmessage()}
          </View>

          {/** BODY */}
          <View style={{ alignItems: "center" }}>{props.body()}</View>

          {/** FOOT */}
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            {props.foot()}
          </View>
        </View>
      </View>
    // </Modal>
  );
}
