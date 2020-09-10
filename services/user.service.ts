import { IUserFormValues } from "models/user";
import { AUTHENTICATION } from "./api/endpoints";
import ApiService, { IApiService } from "./api/api.service";
import TokenService from "./token.service";
import { AxiosResponse, AxiosError } from "axios";

export interface IUserService {
  login(user: IUserFormValues): void;
  register(user: IUserFormValues): void;
  refreshToken(
    token: string,
    refreshToken: string
  ): Promise<AxiosResponse | AxiosError>;
  logout(): void;
  apiService: IApiService;
}

class UserService implements IUserService {
  apiService: ApiService;

  constructor() {
    this.apiService = new ApiService(AUTHENTICATION);
  }

  login = (user: IUserFormValues): any =>
    this.apiService.post(`/authentication/login`, user);

  register = (user: IUserFormValues): any =>
    this.apiService.post(`/authentication/register`, user);

  refreshToken = async (
    token: string,
    refreshToken: string
  ): Promise<AxiosResponse | AxiosError> => {
    const res = await this.apiService.post(`/authentication/refresh`, {
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
