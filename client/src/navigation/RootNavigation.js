import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import HomeNavigation from './home/ModalNavigation';
import AuthScreen from  '../containers/auth/AuthScreen';

import TeamNavigation from './teaminfo/ModalNavigation';

/**
 * 최상위 네비게이션입니다.
 * 1. 로컬에서 토큰을 받아옵니다.
 */

const Stack = createStackNavigator();
export default function RootNavigation(){
    // 1. 로컬에서 토큰을 받아옵니다.
    const { token } = useSelector( state => state.AuthReducer)

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {   
                    !token
                    ? <Stack.Screen name="Auth" component={AuthScreen}/> 
                    : <Stack.Screen name="Home" component={HomeNavigation}/>
                }
                <Stack.Screen name="Team" component={TeamNavigation}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}