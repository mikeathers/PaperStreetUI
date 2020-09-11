import { IUser } from "models/user";
import { AxiosResponse } from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

interface LoginRequest {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: IUser;
}

interface LoginFailed {
  type: typeof LOGIN_FAILED;
  payload: Array<string>;
}

interface LogoutRequest {
  type: typeof LOGOUT_REQUEST;
  payload: null;
}

interface LogoutSuccess {
  type: typeof LOGOUT_SUCCESS;
  payload: AxiosResponse;
}

interface LogoutFailed {
  type: typeof LOGOUT_FAILED;
  payload: Error;
}

interface RegisterRequest {
  type: typeof REGISTER_REQUEST;
}

interface RegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: IUser;
}

interface RegisterFailed {
  type: typeof REGISTER_FAILED;
  payload: Array<string>;
}

export type UserActionTypes =
  | LoginRequest
  | LoginSuccess
  | LoginFailed
  | LogoutRequest
  | LogoutSuccess
  | LogoutFailed
  | RegisterRequest
  | RegisterSuccess
  | RegisterFailed;
