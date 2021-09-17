import React from 'react';
import {Alert} from 'react-native';
/**
 * axios에 대한 에러핸들러입니다.
 */
export const errorhandler = (error) =>{
    if (error.response) {
        console.log(error.response);
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        if (error.response.status === 404) {
          Alert.alert("404에러", error.response.message);
        } else {
          Alert.alert("에러", error.response.message);
        }
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        Alert.alert("통신 실패", "통신 실패하였습니다.");
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
      }
}