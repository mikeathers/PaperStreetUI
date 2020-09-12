import { IUserRegisterValues, IUser } from 'models';
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

const registerRequest = (): UserActionTypes => ({
  type: types.REGISTER_REQUEST,
});

const registerSuccessful = (user: IUser): UserActionTypes => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

const registerFailed = (errorMessages: Array<string>): UserActionTypes => ({
  type: types.REGISTER_FAILED,
  payload: errorMessages,
});

const register = async (userDetails: IUserRegisterValues): Promise<void> => {
  _dispatch(registerRequest());
  try {
    const response = await UserService.register(userDetails);
    if (response.status !== 200) {
      await ErrorHandlerService.handleHttpError(
        response,
        _dispatch,
        registerFailed,
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

export { register, registerRequest, registerFailed, registerSuccessful };
