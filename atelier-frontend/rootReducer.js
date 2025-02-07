import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Adjust the path to your authReducer

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
