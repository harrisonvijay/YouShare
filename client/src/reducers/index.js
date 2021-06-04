import { combineReducers } from "redux";

import authReducer from "./auth";
import postsReducer from "./posts";
import userReducer from "./user";

export default combineReducers({ auth: authReducer, posts: postsReducer, userData: userReducer });