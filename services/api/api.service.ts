import axios, { AxiosResponse } from "axios";
import { getEndpoint } from "./endpoints";
import { setAuthHeaders } from "./helpers";

class ApiService {
  agent: any;
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

    this.agent = agent;
    this.defaultHeaders = defaultHeaders;
  }

  get(path: String, authRequired: boolean = false) {
    return this.agent
      .request({
        method: "GET",
        url: path,
        responseType: "json",
        headers: setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response);
  }

  patch(path: String, payload: Object, authRequired: boolean = false) {
    return this.agent
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
        headers: setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response);
  }

  put(path: String, payload: Object, authRequired: boolean = false) {
    return this.agent
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
        headers: setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response);
  }

  post(path: String, payload: Object, authRequired: boolean = false) {
    return this.agent
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        headers: setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response);
  }

  del(path: String, authRequired: boolean = false) {
    return this.agent
      .request({
        method: "DELETE",
        url: path,
        responseType: "json",
        headers: setAuthHeaders(this.defaultHeaders, authRequired),
      })
      .then((response: AxiosResponse) => response);
  }
}

export default ApiService;
