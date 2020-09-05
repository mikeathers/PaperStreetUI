import * as types from "../types";
import { UserActionTypes } from "../types";
import { IUserFormValues, IUser } from "models/user";
import { ErrorHandler, Router } from "services";
import { User } from "services/api";
import { store } from "store";

const _dispatch = store.dispatch;

const registerRequest = (): UserActionTypes => ({
  type: types.REGISTER_REQUEST,
});

const registerSuccessful = (user: IUser): UserActionTypes => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

const registerFailed = (error: string): UserActionTypes => {
  return {
    type: types.REGISTER_FAILED,
    payload: error,
  };
};

const blah = () => {
  console.log("hey");
  Router.pushToLogin();
  _dispatch(registerRequest());
};

const register = async (userDetails: IUserFormValues) => {
  try {
    _dispatch(registerRequest());
    const response = await User.register(userDetails);
    _dispatch(registerSuccessful(response.data));
    Router.pushToHome();
  } catch (error) {
    try {
      const handledResponse = await ErrorHandler.handleHttpError(
        error,
        _dispatch,
        registerFailed
      );
      if (handledResponse.status === 200)
        _dispatch(registerSuccessful(handledResponse.data));
    } catch {}
  }
};

export { blah, register, registerRequest, registerFailed, registerSuccessful };
