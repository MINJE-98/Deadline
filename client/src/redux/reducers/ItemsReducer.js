import { items } from "../actions/index";
const {
  TEAM_SEARCH_ITEM,
  TOTAL_SEARCH_ITEM,
  ITEMS_ERROR,
  ITEMS_LIST_REQUEST,
  SET_ITEM,
  FORK_ITEM,
} = items;

//초기 state 설정
const defaultSate = {
  iteminfo: null,
  itemlist: null,
  itemerror: null,
  isFetching: false,
};

export default ItemsReducer = (state = defaultSate, action) => {
  switch (action.type) {
    case ITEMS_LIST_REQUEST:
      console.log("ITEMS_LIST_REQUEST");
      return { ...state, isFetching: true };
    case TEAM_SEARCH_ITEM:
      console.log("TEAM_SEARCH_ITEM");
      return { ...state, iteminfo: action.iteminfo, isFetching: false };
    case SET_ITEM:
      console.log("SET_ITEM");
      return { ...state, iteminfo: action.iteminfo, isFetching: false };
    case FORK_ITEM:
      console.log("FORK_ITEM");
      return { ...state, iteminfo: action.iteminfo, isFetching: false };
    case TOTAL_SEARCH_ITEM:
      console.log("TOTAL_SEARCH_ITEM");
      return { ...state, itemlist: action.itemlist, isFetching: false };
    case ITEMS_ERROR:
      console.log("ITEMS_ERROR");
      return { ...state, itemerror: state.itemerror, isFetching: false };
    default:
      // console.log("ItemsReducer");
      return state;
  }
};
