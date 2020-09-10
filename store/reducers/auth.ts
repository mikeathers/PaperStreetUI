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
    case types.LOGIN_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        error: false,
        errorMessages: [],
      };
    case types.LOGOUT_REQUEST:
      return { ...authInitialState };
    default:
      return state;
  }
};

export default authReducer;
