import * as React from 'react';
import * as Facebook from 'expo-facebook';
import FacebookInit from '../../config/FacebookConfig';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
// 리둑스 훅
import { useDispatch } from 'react-redux';
// 사용할 액션
import { remove_token } from '../../redux/actions/AuthAction'

export default function SettingScreen(){
  const dispatch = useDispatch();
  const reamoveToken = () => dispatch(remove_token());
  const logOut = async() =>{
    await FacebookInit;
    await Facebook.logOutAsync()
    reamoveToken()
  }
  
  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => logOut()}>
            <Text style={{color: "red", fontSize: 15}}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  main:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'column'
  },
  profile:{
    width: 130,
    height: 130,
    borderRadius: 100
  },
  button:{
    borderColor: "#3c444f",
    padding: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    width: 400,
    
  }
})