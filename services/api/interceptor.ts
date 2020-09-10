import { AxiosInstance } from "axios";
import TokenService from "../token.service";
import RouterService from "../router.service";

const interceptor = (agent: AxiosInstance) => {
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

      const res = await agent.post(`/authentication/refresh`, {
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
};

export default interceptor;
