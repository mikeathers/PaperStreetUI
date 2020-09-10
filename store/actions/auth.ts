import * as types from "../types";
import { UserActionTypes } from "../types";
import { IUserFormValues, IUser } from "models/user";
import { ErrorHandlerService, RouterService } from "services";
import { UserService, TokenService } from "services/api";
import { store } from "store";

const _dispatch = store.dispatch;

const registerRequest = (): UserActionTypes => ({
  type: types.REGISTER_REQUEST,
});

const registerSuccessful = (user: IUser): UserActionTypes => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

const registerFailed = (errorMessages: Array<string>): UserActionTypes => {
  return {
    type: types.REGISTER_FAILED,
    payload: errorMessages,
  };
};

const blah = async () => {
  const userDetails = {
    email: "athers_05@hotmail.co.uk",
    password: "Password123!",
  };
  const response = await UserService.login(userDetails);
  TokenService.setAuthToken(response.data);
  console.log(response);
};

const test = async () => {
  const response = await UserService.test();
  console.log(response);
};

const register = async (userDetails: IUserFormValues) => {
  _dispatch(registerRequest());
  try {
    const response = await UserService.register(userDetails);
    if (response.status !== 200) {
      await ErrorHandlerService.handleHttpError(
        response,
        _dispatch,
        registerFailed
      );
    } else {
      TokenService.setAuthToken(response.data);
      _dispatch(registerSuccessful(response.data));
    }
    RouterService.pushToHome();
  } catch (err) {
    _dispatch(registerFailed(err?.data?.errors));
  }
};

export {
  blah,
  test,
  register,
  registerRequest,
  registerFailed,
  registerSuccessful,
};
