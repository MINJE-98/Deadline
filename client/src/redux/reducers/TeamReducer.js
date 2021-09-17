import { teamlist } from '../actions/index'
const { SET_TEAMLIST } = teamlist

//초기 state 설정
const defaultSate ={
    teamlist: null,
    isload: false
}
export default TeamReducer = (state = defaultSate, action) =>{

    switch (action.type){
        case SET_TEAMLIST:
            console.log("SET_TEAMLIST");
            return {...state, teamlist: action.teamlist}
        // case REFRESH_TEAMLIST:
        //     console.log("REFRESH_TEAMLIST");
        //     return {...state, isload: action.isload}
        // 초기 상태는 default에서 정합니다.
        default:
            // console.log("TeamReducer");
            return state
    }
}
