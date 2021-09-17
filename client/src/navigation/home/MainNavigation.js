import React, { Component } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../containers/home/HomeScreen";
import SettingScreen from "../../containers/home/SettingScreen";

import {
  HeaderRightIcon,
  HeaderLeftTitle,
  HeaderLeftIcon,
} from "../../components/Header";

/**
 * HOME -> Main네비게이션입니다.
 */
const Stack = createStackNavigator();
export default class MainNavigation extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <></>,
            headerLeft: () => <HeaderLeftTitle text={"팀 리스트"} />,
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <HeaderRightIcon
                  iconType={"MaterialIcons"}
                  name={"group-add"}
                  onPress={() => this.props.navigation.navigate("MakeTeam")}
                />
                <HeaderRightIcon
                  iconType={"MaterialIcons"}
                  name={"email"}
                  onPress={() => this.props.navigation.navigate("JoinTeam")}
                />
                <HeaderRightIcon
                  iconType={"MaterialIcons"}
                  name={"settings"}
                  onPress={() => this.props.navigation.navigate("Setting")}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            headerTitle: () => <></>,
            headerLeft: () => (
              <HeaderLeftIcon
                iconType={"MaterialIcons"}
                name={"arrow-back"}
                onPress={() => this.props.navigation.goBack()}
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}
