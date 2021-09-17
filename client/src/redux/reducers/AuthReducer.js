import { auth } from '../actions/index'
const { SET_TOKEN, REMOVE_TOKEN } = auth

//초기 state 설정
const defaultSate ={
    token: null
}
export default AuthReducer = (state = defaultSate, action) =>{

    switch (action.type){
        case SET_TOKEN:
            console.log("SET_TOKEN");
            return {...state, token: action.token}
        case REMOVE_TOKEN:
            console.log("REMOVE_TOKEN");
            return {...state, token: null}
        // 초기 상태는 default에서 정합니다.
        default:
            // console.log("AuthReducer");
            return state
    }
}
