import * as api from "../../api/Api";
import { Alert } from "react-native";

// 엑션 타입입니다.
const SET_TEAMLIST = "SET_TEAMLIST";
// const GET_TEAMLIST = 'GET_TEAMLIST'
// const REFRESH_TEAMLIST = 'REFRESH_TEAMLIST'

/**
 * 유저가 가지고있는 팀리스트를 가져옵니다.
 * 1. 토큰을 통해 유저가 속한 팀리스트를 가져옵니다.
 */
const set_teamlist = (token) => {
  return async (dispatch) => {
    try {
      // 1. 토큰을 통해 유저가 속한 팀리스트를 가져옵니다.
      const result = await api.get_user_teamlist(token);
      if (!!result) {
        console.log(!result);

        dispatch({
          type: SET_TEAMLIST,
          teamlist: result.data.data,
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
        Alert.alert("통신을 실패", "통신 실패하였습니다.");
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
      }
    }
  };
};
// const get_teamlist = () =>({
//     type: GET_TEAMLIST
// })
// const refresh_teamlist () =>

export {
  SET_TEAMLIST,
  // REFRESH_TEAMLIST,
  set_teamlist,
  // get_teamlist,
};
