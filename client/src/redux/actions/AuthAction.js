import * as Facebook from "expo-facebook";
import FacebookInit from "../../config/FacebookConfig";
import * as api from "../../api/Api";
import { Alert } from "react-native";

// 엑션 타입입니다.
const SET_TOKEN = "SET_TOKEN";
const REMOVE_TOKEN = "REMOVE_TOKEN";

/**
 * 유저의 토큰 검증 후 로컬에 등록합니다.
 * 1. 페이스북으로 부터 토큰을 받아옵니다.
 * 2. api서버에 유저가 등록되어 있는지 확인합니다.
 * 3. api서버에 유저가 등록되어 있지않다면, 유저를 등록합니다.
 * 4. token을 스토어에 저장하는 action을 작성합니다.
 */
const set_token = () => {
  return async (dispatch) => {
    try {
      await FacebookInit;
      // 1. 페이스북으로 부터 토큰을 받아옵니다.
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // 2. api서버에 유저가 등록되어 있는지 확인합니다.
        const result = await api.get_user(token);
        console.log("#########유저 등록###########");
        console.log(result);
        // 3. api서버에 유저가 등록되어 있지않다면, 유저를 등록합니다.
        if (result.data.data == null) await api.set_user(token);
        // 4. token을 스토어에 저장하는 action을 작성합니다.
        dispatch({
          type: SET_TOKEN,
          token: token,
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        if (error.response.status === 404) {
          Alert.alert("404에러", error.response.message);
        } else {
          Alert.alert("40*에러", error.response.message);
        }
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        Alert.alert("통신 실패", "통신 실패하였습니다.");
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
      }
    }
  };
};

/**
 * 유저의 토큰을 로컬에서 제거합니다.
 */
const remove_token = () => ({ type: REMOVE_TOKEN });

export { 
  SET_TOKEN, 
  REMOVE_TOKEN, 
  set_token, 
  remove_token };
