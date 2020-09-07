import { AxiosResponse } from "axios";
import { IUserFormValues } from "models/user";
import { AUTHENTICATION } from "./endpoints";
import { ApiService } from ".";
import TokenService from "./token.service";

class User {
  apiService: ApiService;
  constructor() {
    this.apiService = new ApiService(AUTHENTICATION);
  }

  current = (): Promise<AxiosResponse> =>
    this.apiService.get("/authentication/current");

  login = (user: IUserFormValues): Promise<AxiosResponse> =>
    this.apiService.post(`/authentication/login`, user);

  register = (user: IUserFormValues): Promise<AxiosResponse> =>
    this.apiService.post(`/authentication/register`, user);

  refreshToken = async (token: string, refreshToken: string) => {
    const res = await this.apiService.post(`/authentication/refresh`, {
      token,
      refreshToken,
    });
    TokenService.setAuthToken(res.data);
    return res.data.token;
  };
}

export default new User();
