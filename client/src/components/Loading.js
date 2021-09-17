import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";
import { loading } from "../styles/light/styles";

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <Modal
      animationType={this.props.aniType} transparent={true} visible={this.props.visible}
      >
        <View style={loading.defaultStyle}>
          <View style={loading.loginWall}/>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </Modal>
    );
  }
}
