import React, { Component } from "react";
import { View } from "react-native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import MainNavigation from "./MainNavigation";
import ItemlistScreen from "../../containers/teaminfo/deadline/ItemlistScreen";
import InputBarcode from "../../containers/teaminfo/deadline/InputBarcode";

/**
 * HOME -> MODAL네비게이션입니다.
 */
const Stack = createStackNavigator();
export default class ModalNavigation extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      >
        <Stack.Screen name="Home" component={MainNavigation} />
        <Stack.Screen
          name="Itemlist"
          component={ItemlistScreen}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: "identity",
                }),
              },
            }),
          }}
        />
        <Stack.Screen
          name="InputBarcode"
          component={InputBarcode}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: "identity",
                }),
              },
            }),
          }}
        />
      </Stack.Navigator>
    );
  }
}
