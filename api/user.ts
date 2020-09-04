import axios, { AxiosResponse } from "axios";
import { IUserFormValues } from "models/user";
import { AUTHENTICATION } from "./endpoints";
import { Agent } from ".";

const responseBody = (response: AxiosResponse) => response;

class User {
  agent: Agent;
  constructor() {
    this.agent = new Agent(AUTHENTICATION);
  }

  current = (): Promise<AxiosResponse> =>
    this.agent.get("/authentication/current", responseBody);

  login = (user: IUserFormValues): Promise<AxiosResponse> =>
    this.agent.post(`/authentication/login`, user, responseBody);

  register = (user: IUserFormValues): Promise<AxiosResponse> =>
    this.agent.post(`/authentication/register`, user, responseBody);

  refreshToken = async (token: string, refreshToken: string) => {
    const res = await axios.post(`/authentication/refresh`, {
      token,
      refreshToken,
    });
    window.localStorage.setItem("jwt", res.data.token);
    window.localStorage.setItem("refreshToken", res.data.refreshToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    return res.data.token;
  };
}

export default new User();
