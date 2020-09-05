import { combineReducers } from "redux";
import { routerReducer } from "connected-next-router";
import auth from "./auth";
import { IAuthState } from "../reducers/auth";

export type LocationState = {
  href: string;
  pathname: string;
  hash: string;
  search: string;
};

export type RouterAction = "POP" | "PUSH" | "REPLACE";

export type RouterState = {
  location: LocationState;
  action: RouterAction;
};

export type RootState = {
  router: RouterState;
  auth: IAuthState;
};

export default combineReducers({
  auth,
  router: routerReducer,
});
