import AuthReducer from "./AuthReducer";
import TeamReducer from "./TeamReducer";
import TeamInfoRducer from "./TeamInfoRducer";
import ItemsReducer from "./ItemsReducer";
import DeadlineReducer from './DeadlineReducer'
import { combineReducers } from "redux";

export default rootReducer = combineReducers({
  AuthReducer: AuthReducer,
  TeamReducer: TeamReducer,
  TeamInfoRducer: TeamInfoRducer,
  ItemsReducer: ItemsReducer,
  DeadlineReducer: DeadlineReducer
});
