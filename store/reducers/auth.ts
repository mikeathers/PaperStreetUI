import { AnyAction } from "redux";
import { IUser } from "models/user";
import * as types from "../types";

export interface IAuthState {
  user: IUser;
  errorMessage: string;
  error: boolean;
  requestInProgress: boolean;
}

export const initialState: IAuthState = {
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

export default (state = initialState, action: AnyAction) => {
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
        user: action.payload,
        requestInProgress: false,
        error: false,
        errorMessage: "",
      };
    case types.REGISTER_FAILED:
      return {
        ...state,
        user: initialState.user,
        requestInProgress: false,
        error: true,
        errorMessage: action.payload,
      };
    case types.LOGIN:
      return { ...state, user: action.payload };
    case types.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};
