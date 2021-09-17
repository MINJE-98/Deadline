import React, { useEffect } from "react";
import { SocialIcon } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native';
// 리둑스 훅
import { useDispatch } from 'react-redux';
// 사용할 액션
import { set_token } from '../../redux/actions/AuthAction'
import { authstyles } from '../../styles/light/styles'
export default function AuthScreen(){
  const dispatch = useDispatch();
  const setToken = () => dispatch(set_token())



  return (
    <KeyboardAvoidingView style={authstyles.defaultStyle} behavior="padding">
      <SocialIcon title="페이스북으로 시작하기" style={{ width: "90%" }} button={true} type="facebook" onPress={()=> setToken()} /> 
    </KeyboardAvoidingView>
  );
    
}

