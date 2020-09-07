import { AnyAction } from "redux";
import { IUser } from "models/user";
import * as types from "../types";

export interface IAuthState {
  user: IUser;
  errorMessage: string;
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
  errorMessage: "",
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
        errorMessage: "",
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: { ...action.payload, isAuthenticated: true },
        requestInProgress: false,
        error: false,
        errorMessage: "",
      };
    case types.REGISTER_FAILED:
      return {
        ...state,
        user: authInitialState.user,
        requestInProgress: false,
        error: true,
        errorMessage: action.payload,
      };
    case types.LOGIN:
      return { ...state, user: action.payload };
    case types.LOGOUT:
      return { ...authInitialState };
    default:
      return state;
  }
};

export default authReducer;
