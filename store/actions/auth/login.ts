import { IUser, IUserLoginValues } from 'models';
import {
  ErrorHandlerService,
  RouterService,
  UserService,
  TokenService,
} from 'services';
import { store } from 'store';
import { UserActionTypes } from '../../types/auth';
import * as types from '../../types/auth';

const _dispatch = store.dispatch;

const loginRequest = (): UserActionTypes => ({
  type: types.LOGIN_REQUEST,
});

const loginSuccessful = (user: IUser): UserActionTypes => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginFailed = (errorMessages: Array<string>): UserActionTypes => ({
  type: types.LOGIN_FAILED,
  payload: errorMessages,
});

const login = async (loginDetails: IUserLoginValues): Promise<void> => {
  _dispatch(loginRequest());
  try {
    const response = await UserService.login(loginDetails);
    if (response.status !== 200) {
      await ErrorHandlerService.handleHttpError(
        response,
        _dispatch,
        loginFailed,
      );
    } else {
      TokenService.setAuthToken(response.data);
      _dispatch(loginSuccessful(response.data));
    }
    RouterService.pushToHome();
  } catch (err) {
    _dispatch(loginFailed(err?.data?.errors));
  }
};

export { login, loginRequest, loginFailed, loginSuccessful };
