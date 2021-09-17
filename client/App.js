import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigation from './src/navigation/RootNavigation';
import { store, persistor } from './src/redux/store/Store';

/**
 * app
 */

export default class App extends Component{
  // 렌더링전 로딩 컴포넌트
  renderLoading = () => { 
    return ( 
      <View>               
          <ActivityIndicator size={"large"} /> 
      </View>         
    );    
  };
  render(){
    return(
    <Provider store={store}>
      <PersistGate loading={this.renderLoading()} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  )
  }
}