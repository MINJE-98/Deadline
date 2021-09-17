import { teaminfo } from '../actions/index'
const { SELECTED_TEAM, SELECTED_TEAM_INFO } = teaminfo

// 초기 state 설정
const defaultSate ={
    selected_team: null
}

export default TeamInfoReducer = (state = defaultSate, action) =>{
    switch (action.type) {
        case SELECTED_TEAM:
            console.log("SELECTED_TEAM");
            return {...state, selected_team: action.selected_team}
        case SELECTED_TEAM_INFO:
            return {...state}
        default:
            // console.log("TeamInfoReducer");
            return state
    }
}
