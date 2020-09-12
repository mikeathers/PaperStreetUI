import {
  RouterService,
  TokenService,
  ErrorHandlerService,
  UserService,
} from 'services';
import { store } from 'store';
import { login, loginRequest, loginSuccessful, loginFailed } from '../..';

const { defaultAxiosResponse } = global;

jest.mock('services/router.service');
jest.mock('services/errorHandler.service');
jest.mock('services/token.service');
jest.mock('store');

describe('Login actions', () => {
  const mockedSuccessResponse = {
    ...defaultAxiosResponse,
    data: {
      displayName: 'Test User',
      token: '101010101010',
      refreshToken: '202020202',
      isAuthenticated: true,
      authenticationError: '',
    },
  };

  const userLoginDetails = {
    email: 'test@test.com',
    password: 'Password1',
    firstName: 'Test',
    lastName: 'User',
  };

  describe('Login Request', () => {
    beforeEach(() => {
      jest.spyOn(UserService, 'login').mockResolvedValue(mockedSuccessResponse);
    });

    it('should dispatch a login request action', async () => {
      await login(userLoginDetails);
      expect(store.dispatch).toHaveBeenCalledWith(loginRequest());
    });

    it('should call UserService.login', async () => {
      await login(userLoginDetails);
      expect(UserService.login).toBeCalledWith(userLoginDetails);
    });
  });

  describe('Login Success', () => {
    beforeEach(() => {
      jest.spyOn(UserService, 'login').mockResolvedValue(mockedSuccessResponse);
    });

    it('should dispatch register success action', async () => {
      await login(userLoginDetails);
      expect(store.dispatch).toHaveBeenLastCalledWith(
        loginSuccessful(mockedSuccessResponse.data),
      );
    });

    it('should call the TokenService to save the jwt token', async () => {
      await login(userLoginDetails);
      expect(TokenService.setAuthToken).toHaveBeenCalledWith(
        mockedSuccessResponse.data,
      );
    });

    it('should push to the home page', async () => {
      await login(userLoginDetails);
      expect(RouterService.pushToHome).toHaveBeenCalled();
    });
  });

  describe('Login Failed', () => {
    const mockedErrorResponse = {
      config: {},
      response: {
        data: {},
        status: 400,
        statusText: '',
        headers: {},
        config: {},
      },
    };

    beforeEach(() => {
      jest.spyOn(UserService, 'login').mockRejectedValue(mockedErrorResponse);
    });

    it('should call handleHttpError', async () => {
      const handleHttpErrorSpy = jest.spyOn(
        ErrorHandlerService,
        'handleHttpError',
      );
      try {
        await login(userLoginDetails);
      } catch {
        expect(handleHttpErrorSpy).toHaveBeenCalledWith(
          mockedErrorResponse,
          store.dispatch,
          loginFailed,
        );
      }
    });
  });
});
