import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { View, TouchableOpacity, Text } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import { Context } from '../src/context/conext';

import LoadingScreen from '../../components/Loading';

const Stack = createStackNavigator();
export default class ScanModal extends Component {
//  static contextType = Context
  
  constructor(props){
        super(props);
        
    }
    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen name="loading" component={LoadingScreen} options={{ 
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
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
                            extrapolate: 'identity',
                        }),
                        },
                    }),
                }}/>
            </Stack.Navigator>
        )
    }
}
