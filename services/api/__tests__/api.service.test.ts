import mockAxios from "jest-mock-axios";
import ApiService from "../api.service";
import { AUTHENTICATION } from "services/api/endpoints";

describe("API Service", () => {
  const catchFn = jest.fn();
  const thenFn = jest.fn();

  const defaultAxiosResponse = {
    config: {},
    data: {},
    headers: {},
    status: 200,
    statusText: "OK",
  };

  afterEach(() => {
    mockAxios.reset();
  });

  describe("GET", () => {
    it("should make a GET request to the authentication microservice with correct url", () => {
      const path = "/login";
      const apiService = new ApiService(AUTHENTICATION);

      apiService.get(path).then(thenFn).catch(catchFn);

      const {
        config: { method },
        url,
      } = mockAxios.lastReqGet();

      expect(method).toEqual("GET");

      expect(url).toEqual(path);

      mockAxios.mockResponse(defaultAxiosResponse);

      expect(catchFn).not.toHaveBeenCalled();
      expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
    });

    it("should make a GET request to the authentication microservice with auth header when requiresAuth is true", () => {
      const requiresAuth = true;
      const path = "/login";
      const apiService = new ApiService(AUTHENTICATION);

      apiService.get(path, requiresAuth).then(thenFn).catch(catchFn);

      const {
        config: { method, headers },
      } = mockAxios.lastReqGet();

      expect(method).toEqual("GET");

      expect(headers.Authorization).not.toBeNull();

      mockAxios.mockResponse(defaultAxiosResponse);

      expect(catchFn).not.toHaveBeenCalled();
      expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
    });
  });
});
