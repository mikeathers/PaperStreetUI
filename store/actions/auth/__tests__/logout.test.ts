import {
  logout,
  logoutRequest,
  logoutSuccessful,
  logoutFailed,
} from '../logout';
import { store } from 'store';
import { TokenService, RouterService } from 'services';
import { errorMessages } from 'shared/constants';

jest.mock('store');
jest.mock('services/router.service');
jest.mock('services/token.service');

describe('Logout actions', () => {
  describe('Logout Request', () => {
    it('should dispatch a logout request action', () => {
      logout();
      expect(store.dispatch).toHaveBeenCalledWith(logoutRequest());
    });

    it('should call TokenService to remove the tokens', () => {
      logout();
      expect(TokenService.removeAuthToken).toHaveBeenCalled();
    });

    it('should call RouterService to push to login', () => {
      logout();
      expect(RouterService.pushToLogin).toHaveBeenCalled();
    });
  });

  describe('Logout Success', () => {
    it('should dispatch logout success action when no errors are thrown', () => {
      logout();
      expect(store.dispatch).toHaveBeenCalledWith(logoutSuccessful());
    });
  });

  describe('Logout Failed', () => {
    it('should dispatch logout failed action when error is thrown', () => {
      jest.spyOn(TokenService, 'removeAuthToken').mockImplementation(() => {
        throw new Error();
      });
      logout();
      expect(store.dispatch).toHaveBeenLastCalledWith(
        logoutFailed([errorMessages.LOGOUT_FAILED]),
      );
    });
  });
});
