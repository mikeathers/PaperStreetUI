import * as types from "../types";
import { Dispatch } from "redux";
import { UserActionTypes } from "../types";
import { IUserFormValues, IUser } from "models/user";
import { ErrorHandler, Router } from "../../services";
import { User } from "../../api";

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

const register = (userDetails: IUserFormValues) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(registerRequest());
    const response = await User.register(userDetails);
    dispatch(registerSuccessful(response.data));
    Router.pushToHome();
  } catch (error) {
    const handledResponse = await ErrorHandler.handleHttpError(
      error,
      dispatch,
      registerFailed
    );
    if (handledResponse.status === 200)
      dispatch(registerSuccessful(handledResponse.data));
  }
};

export { register, registerRequest, registerFailed, registerSuccessful };
