import { RouterService, TokenService } from 'services';
import { store } from 'store';
import { UserActionTypes } from '../../types/auth';
import * as types from '../../types/auth';
import { errorMessages } from 'shared/constants';

const _dispatch = store.dispatch;

const logoutRequest = (): UserActionTypes => ({
  type: types.LOGOUT_REQUEST,
});

const logoutSuccessful = (): UserActionTypes => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutFailed = (errorMessages: Array<string>): UserActionTypes => ({
  type: types.LOGIN_FAILED,
  payload: errorMessages,
});

const logout = (): void => {
  _dispatch(logoutRequest());
  try {
    TokenService.removeAuthToken();
    RouterService.pushToLogin();
    _dispatch(logoutSuccessful());
  } catch (err) {
    _dispatch(logoutFailed([errorMessages.LOGOUT_FAILED]));
  }
};

export { logout, logoutRequest, logoutFailed, logoutSuccessful };
