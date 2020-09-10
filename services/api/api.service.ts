import axios, { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import { getEndpoint } from "./endpoints";
import TokenService from "../token.service";
import { RouterService } from "services";

class ApiService {
  agent: AxiosInstance;
  defaultHeaders: { Accept: string; "Content-Type": string };

  constructor(microservice: string) {
    const defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const agent = axios.create({
      baseURL: getEndpoint(microservice),
      headers: defaultHeaders,
    });

    agent.interceptors.response.use(undefined, async (error) => {
      const originalRequest = error.config;
      const { status } = error.response;

      if (status === 401 && originalRequest.url.endsWith("refresh")) {
        TokenService.removeAuthToken();

        RouterService.pushToLogin();

        return Promise.reject(error);
      }

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const { jwt: oldJwt, refreshToken } = TokenService.getAuthToken();

        const res = await this.agent.post(`/authentication/refresh`, {
          oldJwt,
          refreshToken,
        });

        TokenService.setAuthToken(res!.data);

        const { jwt } = TokenService.getAuthToken();

        originalRequest.headers.Authorization = "Bearer " + jwt;

        return agent(originalRequest);
      }

      return error.response;
    });

    this.agent = agent;
    this.defaultHeaders = defaultHeaders;
  }

  get(path: string, authRequired: boolean = false) {
    return this.agent
      .request({
        method: "GET",
        url: path,
        responseType: "json",
        headers: TokenService.setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response)
      .catch((err: AxiosError) => err.response);
  }

  patch(path: string, payload: Object, authRequired: boolean = false) {
    return this.agent
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
        headers: TokenService.setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response)
      .catch((err: AxiosError) => err.response);
  }

  put(path: string, payload: Object, authRequired: boolean = false) {
    return this.agent
      .request({
        method: "PUT",
        url: path,
        responseType: "json",
        data: payload,
        headers: TokenService.setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response)
      .catch((err: AxiosError) => err.response);
  }

  post(path: string, payload: Object, authRequired: boolean = false) {
    return this.agent
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        headers: TokenService.setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response)
      .catch((err: AxiosError) => err.response);
  }

  del(path: string, authRequired: boolean = false) {
    return this.agent
      .request({
        method: "DELETE",
        url: path,
        responseType: "json",
        headers: TokenService.setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response)
      .catch((err: AxiosError) => err.response);
  }
}

export default ApiService;
