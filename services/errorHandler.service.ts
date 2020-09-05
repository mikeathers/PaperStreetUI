import axios from "axios";
import { User } from "./api";
import { errorMessages } from "./constants";
import { Router } from ".";
import { Dispatch } from "redux";
import { TokenService } from "./api";

class ErrorHandler {
  tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

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
      this.tokenService.removeAuthToken();
      _dispatch(action(errorMessages.SESSION_EXPIRED_MESSAGE));
      Router.pushToLogin();
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { jwt, refreshToken } = this.tokenService.getAuthToken();
      return User.refreshToken(jwt!, refreshToken!)
        .then((res) => {
          this.tokenService.setAuthToken(res.data);
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
