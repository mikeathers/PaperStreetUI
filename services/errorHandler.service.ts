import axios from "axios";
import { User } from "../api";
import { errorMessages } from "./constants";
import { Router } from ".";
import { Dispatch } from "redux";

class ErrorHandler {
  constructor() {}

  handleHttpError = (error: any, _dispatch: Dispatch, action: any) => {
    if (
      error.message === errorMessages.INCOMING_NETWORK_ERROR &&
      !error.response
    ) {
      _dispatch(action(errorMessages.NETWORK_ERROR_MESSAGE));
    }

    const { status, data, config } = error.response;
    const originalRequest = error.config;

    if (status === 404) {
      _dispatch(action(errorMessages.NOT_FOUND_ERROR_MESSAGE));
    }

    if (status === 401 && originalRequest.url.endsWith("refresh")) {
      if (window.localStorage.getItem("jwt") !== null)
        window.localStorage.removeItem("jwt");
      if (window.localStorage.getItem("refrehToken") !== null)
        window.localStorage.removeItem("refreshToken");
      _dispatch(action(errorMessages.SESSION_EXPIRED_MESSAGE));
      Router.pushToLogin();
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = window.localStorage.getItem("jwt");
      const refreshToken = window.localStorage.getItem("refreshToken");
      return User.refreshToken(token!, refreshToken!)
        .then((res) => {
          window.localStorage.setItem("jwt", res.data.token);
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.token}`;
          return axios(originalRequest);
        })
        .catch((err) => {
          throw err;
        });
    }

    if (
      status === 400 &&
      config.method === "get" &&
      data.errors.hasOwnProperty("id")
    ) {
      _dispatch(action(errorMessages.NOT_FOUND_ERROR_MESSAGE));
    }

    if (status === 500) {
      _dispatch(action(errorMessages.SERVER_ERROR_MESSAGE));
    }

    throw error.response;
  };
}

export default new ErrorHandler();
