import { IUserFormValues } from "models/user";
import { AUTHENTICATION } from "./api/endpoints";
import ApiService from "./api/api.service";
import TokenService from "./token.service";

class UserService {
  apiService: ApiService;

  constructor() {
    this.apiService = new ApiService(AUTHENTICATION);
  }

  current = (): any => this.apiService.get("/authentication/current");

  test = (): any => this.apiService.get(`/authentication/test`);

  login = (user: IUserFormValues): any =>
    this.apiService.post(`/authentication/login`, user);

  register = (user: IUserFormValues): any =>
    this.apiService.post(`/authentication/register`, user);

  refreshToken = async (token: string, refreshToken: string) => {
    const res = await this.apiService.post(`/authentication/refresh`, {
      token,
      refreshToken,
    });
    TokenService.setAuthToken(res?.data);
    return res;
  };
}

export default new UserService();
