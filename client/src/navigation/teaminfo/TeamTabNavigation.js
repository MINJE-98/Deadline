// import React, { Component } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Feather from 'react-native-vector-icons/Feather'

// import TeamSettingScreen from '../../../containers/teaminfo/TeamSettingScreen';
// import TeamStackNavigation from './TeamStackNavigation'
// // import DeadlineNavigation from './deadline/DeadlineNavigation';

// const AppTab = createBottomTabNavigator();
// export default class TeamTabNavigation extends Component {
  
//   constructor(props){
//         super(props);
//         // scanscreen으로 갈때 탭 숨김.

//     }
//     render(){
//         return(
//             <AppTab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                   let iconName;
      
//                   if (route.name === 'TeamInfo') {
//                     iconName = 'hash';
//                   } else if (route.name === 'setting') {
//                     iconName = 'settings';
//                   }
      
//                   return <Feather name={iconName} size={size} color={color} />;
//                 },
//               })}
//               tabBarOptions={{
//                 activeTintColor: '#3c444f',
//                 inactiveTintColor: '#808080',
//                 showLabel: false
//               }}
//                 >
//                 <AppTab.Screen name="TeamStack" component={TeamStackNavigation} />
//                 <AppTab.Screen name="setting" component={TeamSettingScreen} />
//             </AppTab.Navigator>
//           )
//     }
// }
