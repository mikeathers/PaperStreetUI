import { IUser } from "models/user";
import { AxiosResponse } from "axios";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

interface Login {
  type: typeof LOGIN;
  payload: IUser;
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: AxiosResponse;
}

interface LoginFailed {
  type: typeof LOGIN_FAILED;
  payload: Error;
}

interface Logout {
  type: typeof LOGOUT;
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
  payload: string;
}

export type UserActionTypes =
  | Login
  | LoginSuccess
  | LoginFailed
  | Logout
  | LogoutSuccess
  | LogoutFailed
  | RegisterRequest
  | RegisterSuccess
  | RegisterFailed;
