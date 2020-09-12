import { IUserRegisterValues, IUserLoginValues } from 'models';
import { AxiosResponse, AxiosError } from 'axios';
import { AUTHENTICATION } from './api/api.endpoints';
import ApiService, { IApiService } from './api/api.service';
import TokenService from './token.service';

export interface IUserService {
  login(user: IUserLoginValues): void;
  register(user: IUserRegisterValues): void;
  refreshToken(
    token: string,
    refreshToken: string,
  ): Promise<AxiosResponse | AxiosError>;
  logout(): void;
  apiService: IApiService;
}

class UserService implements IUserService {
  apiService: ApiService;

  constructor() {
    this.apiService = new ApiService(AUTHENTICATION);
  }

  login = (user: IUserLoginValues): any =>
    this.apiService.post('/authentication/login', user);

  register = (user: IUserRegisterValues): any =>
    this.apiService.post('/authentication/register', user);

  refreshToken = async (
    token: string,
    refreshToken: string,
  ): Promise<AxiosResponse | AxiosError> => {
    const res = await this.apiService.post('/authentication/refresh', {
      token,
      refreshToken,
    });
    TokenService.setAuthToken(res.data);
    return res!;
  };

  logout = () => {
    TokenService.removeAuthToken();
  };
}

export default new UserService();
