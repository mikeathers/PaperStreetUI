import axios from "axios";
import { getEndpoint } from "./endpoints";

class Agent {
  agent: any;
  constructor(microservice: string) {
    const agent = axios.create({
      baseURL: getEndpoint(microservice),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    agent.interceptors.request.use(
      (config) => {
        const token = window.localStorage.getItem("jwt");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.agent = agent;
  }

  get(path: String, callback: Function) {
    return this.agent
      .get(path)
      .then((response: { status: any; data: any }) =>
        callback(response.status, response.data)
      );
  }

  patch(path: String, payload: Object, callback: Function) {
    return this.agent
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response: { status: any; data: any }) =>
        callback(response.status, response.data)
      );
  }

  put(path: String, payload: Object, callback: Function) {
    return this.agent
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response: { status: any; data: any }) =>
        callback(response.status, response.data)
      );
  }

  post(path: String, payload: Object, callback: Function) {
    return this.agent
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response: { status: any; data: any }) =>
        callback(response.status, response.data)
      );
  }

  del(path: String, callback: Function) {
    return this.agent
      .del(path)
      .then((response: { status: any; data: any }) =>
        callback(response.status, response.data)
      );
  }
}

export default Agent;
