import { dead } from '../actions/index'
const { SET_DEADLINE, GET_DEADLINE, DEADLINE_LIST_REQUEST, SET_IMAGE } = dead

//초기 state 설정
const defaultSate ={
    deadline: null,
    isFetching: false,
    image: null,
    done: false
}
export default DeadlineReducer = (state = defaultSate, action) =>{

    switch (action.type){
        case DEADLINE_LIST_REQUEST:
            console.log("DEADLINE_LIST_REQUEST");
            return {...state, done: false, isFetching: true, image: null}
        case SET_DEADLINE:
            console.log("SET_DEADLINE");
            return {...state, done: true, isFetching: false}
        case GET_DEADLINE:
            console.log("GET_DEADLINE");
            return {...state, deadline: action.deadline, isFetching: false}
        case SET_IMAGE:
            console.log("SET_IMAGE");
            return {...state, image: action.image}
        default:
        // console.log("DeadlineReducer");
        return state
    }
}
