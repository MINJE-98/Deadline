import * as Facebook from 'expo-facebook';

import FacebookInit from '../config/FacebookConfig';
import * as api from '../api/Api';
import { Alert } from 'react-native';

/**
 * 유저 인증
 * 1. 사용자의 인증 상태를 확인합니다.
 * 2. 사용자가 인증된 상태가 아닙니다.
 * 3. API서버에 유저가 존재하는지 확인합니다.
 * 4. 유저가 확인 되었습니다. 
 * 5. 알 수 없는 유저입니다.
 */
export const AuthAsync = async(props) => {
    try {
        await FacebookInit;
        // 1. 사용자의 인증 상태를 확인합니다.
        const auth = await Facebook.getAuthenticationCredentialAsync();
        // console.log(auth);
        // 2. 사용자가 인증된 상태가 아닙니다.
        if(!auth) props.dispatch({type: 'logout'})
        else{
            const token = auth.token;
            // 3. 서버에 유저가 존재하는지 확인합니다.
            const get = await api.get_user(token);
            // 4. 유저가 확인 되었습니다. 
            if(get.data.data != undefined) props.dispatch({type: 'login'})
            // 5. 알 수 없는 유저입니다.
            else props.dispatch({type: 'logout'})
        }
    } catch (error) {
        if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            if (error.response.status === 404) {
                props.dispatch({type: 'logout'})
            } else {
                props.dispatch({type: 'logout'})
            }
          }
          else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            console.log(error.request);
            Alert.alert("","통신을 실패하였습니다.", [{text: "확인", onPress: ()=> props.dispatch({type: 'logout'})}])
        }
          else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error', error.message);
            props.dispatch({type: 'logout'})
          }
        }
  }

export const get_token = async() => {
    await FacebookInit;
    // 현재 접속한 유저가 로그인이 되어있는지 확인합니다.
    const auth = await Facebook.getAuthenticationCredentialAsync();
    if (!auth) {
        return false;
    } else {
        return auth.token;
    }
}