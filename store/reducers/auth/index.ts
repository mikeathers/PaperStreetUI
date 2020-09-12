import { AnyAction } from "redux";
import { initialAuthState, IAuthState } from "./initial-auth-state";
import * as types from "../../types/auth";

export interface IAuthReducer {
  getInitialState(): IAuthState;
  reduce(state: IAuthState, action: AnyAction): any;
}

class AuthReducer implements IAuthReducer {
  getInitialState = () => {
    return initialAuthState;
  };

  reduce = (state: IAuthState = this.getInitialState(), action: AnyAction) => {
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
          user: initialAuthState.user,
          requestInProgress: false,
          error: true,
          errorMessages: action.payload,
        };

      //// LOGOUT ////
      case types.LOGOUT_REQUEST:
        return { ...initialAuthState, requestInProgress: true };
      case types.LOGOUT_SUCCESS:
        return { ...initialAuthState, requestInProgress: false };
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
}

export default new AuthReducer();
export * from "./initial-auth-state";
