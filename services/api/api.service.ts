import axios, { AxiosResponse, AxiosInstance } from "axios";
import { getEndpoint } from "./endpoints";
import TokenService from "../token.service";
import interceptor from "./interceptor";

export interface IApiService {
  get(path: string, authRequired: boolean): void;
  patch(path: string, payload: object, authRequired: boolean): void;
  put(path: string, payload: object, authRequired: boolean): void;
  post(
    path: string,
    payload: object,
    authRequired: boolean
  ): Promise<AxiosResponse>;
  del(path: string, authRequired: boolean): void;
}

class ApiService implements IApiService {
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

    interceptor(agent);

    this.agent = agent;
    this.defaultHeaders = defaultHeaders;
  }

  get(path: string, authRequired: boolean = false): Promise<AxiosResponse> {
    return this.agent
      .request({
        method: "GET",
        url: path,
        responseType: "json",
        headers: TokenService.setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response)
      .catch((err) => err.response);
  }

  patch(
    path: string,
    payload: object,
    authRequired: boolean = false
  ): Promise<AxiosResponse> {
    return this.agent
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
        headers: TokenService.setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response)
      .catch((error) => error.response);
  }

  put(
    path: string,
    payload: object,
    authRequired: boolean = false
  ): Promise<AxiosResponse> {
    return this.agent
      .request({
        method: "PUT",
        url: path,
        responseType: "json",
        data: payload,
        headers: TokenService.setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response)
      .catch((error) => error.response);
  }

  post(
    path: string,
    payload: object,
    authRequired: boolean = false
  ): Promise<AxiosResponse> {
    return this.agent
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        headers: TokenService.setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response)
      .catch((error) => error);
  }

  del(path: string, authRequired: boolean = false): Promise<AxiosResponse> {
    return this.agent
      .request({
        method: "DELETE",
        url: path,
        responseType: "json",
        headers: TokenService.setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response)
      .catch((error) => error.response);
  }
}

export default ApiService;
