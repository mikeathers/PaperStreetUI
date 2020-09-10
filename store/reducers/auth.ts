import { AnyAction } from "redux";
import { IUser } from "models/user";
import * as types from "../types";

export interface IAuthState {
  user: IUser;
  errorMessages: [];
  error: boolean;
  requestInProgress: boolean;
}

export const authInitialState: IAuthState = {
  user: {
    displayName: "",
    token: "",
    refreshToken: "",
    image: "",
    isAuthenticated: false,
  },
  errorMessages: [],
  error: false,
  requestInProgress: false,
};

const authReducer = (state = authInitialState, action: AnyAction) => {
  switch (action.type) {
    //// REGISTER ////
    case types.REGISTER_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        error: false,
        errorMessages: [],
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: { ...action.payload, isAuthenticated: true },
        requestInProgress: false,
        error: false,
        errorMessages: [],
      };
    case types.REGISTER_FAILED:
      return {
        ...state,
        user: authInitialState.user,
        requestInProgress: false,
        error: true,
        errorMessages: action.payload,
      };

    //// LOGIN ////
    case types.LOGIN_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        error: false,
        errorMessages: [],
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: { ...action.payload, isAuthenticated: true },
        requestInProgress: false,
        error: false,
        errorMessages: [],
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        user: authInitialState.user,
        requestInProgress: false,
        error: true,
        errorMessages: action.payload,
      };

    //// LOGOUT ////
    case types.LOGOUT_REQUEST:
      return { ...authInitialState, requestInProgress: true };
    case types.LOGOUT_SUCCESS:
      return { ...authInitialState, requestInProgress: false };
    case types.LOGOUT_FAILED:
      return {
        ...state,
        requestInProgress: false,
        error: true,
        errorMessages: action.payload,
      };

    //// DEFAULT ////
    default:
      return state;
  }
};

export default authReducer;
