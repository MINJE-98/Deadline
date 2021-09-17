import React from "react";
import { View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Inputbox(props) {
  return (
      <View style={[{ flexDirection: "row", margin: 10, width: "80%", height: 45, borderBottomWidth:2, borderColor: "lightgray"}]}>
          {/* Icon */}
        <View style={{ padding: 10, width: 45, alignItems: 'center'}}>
            <FontAwesome
                  color="lightgray"
                  size={20}
                  name={props.IconName}
            />
        </View>
        <View style={{ padding: 10 }}>
          {props.Inputbox}
        </View>
      </View>
  );
}