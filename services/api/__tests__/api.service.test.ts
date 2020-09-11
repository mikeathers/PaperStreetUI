import mockAxios from "jest-mock-axios";
import ApiService from "../api.service";
import { AUTHENTICATION } from "services/api/api.endpoints";

describe("API Service", () => {
  const catchFn = jest.fn();
  const thenFn = jest.fn();

  const { defaultAxiosResponse } = global;

  const body = {
    email: "test@test.com",
    password: "Passwprd123!",
    displayName: "Tester",
  };

  afterEach(() => {
    mockAxios.reset();
  });

  describe("GET", () => {
    let apiService;
    const path = "/login";

    beforeEach(() => {
      apiService = new ApiService(AUTHENTICATION);
    });

    it("should make a GET request to the authentication microservice with correct url", () => {
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

  describe("POST", () => {
    let apiService;
    const path = "/register";

    beforeEach(() => {
      apiService = new ApiService(AUTHENTICATION);
    });

    it("should make a POST request to the authentication microservice with correct url", () => {
      apiService.post(path, body).then(thenFn).catch(catchFn);

      const {
        config: { method },
        url,
      } = mockAxios.lastReqGet();

      expect(method).toEqual("POST");

      expect(url).toEqual(path);

      mockAxios.mockResponse(defaultAxiosResponse);

      expect(catchFn).not.toHaveBeenCalled();
      expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
    });

    it("should make a POST request to the authentication microservice with auth header when requiresAuth is true", () => {
      const requiresAuth = true;

      apiService.post(path, body, requiresAuth).then(thenFn).catch(catchFn);

      const {
        config: { method, headers },
      } = mockAxios.lastReqGet();

      expect(method).toEqual("POST");

      expect(headers.Authorization).not.toBeNull();

      mockAxios.mockResponse(defaultAxiosResponse);

      expect(catchFn).not.toHaveBeenCalled();
      expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
    });

    it("should make a POST request to the authentication microservice with correct body data", () => {
      apiService.post(path, body).then(thenFn).catch(catchFn);

      const {
        config: { data },
        url,
      } = mockAxios.lastReqGet();

      expect(data).toEqual(body);

      expect(url).toEqual(path);

      mockAxios.mockResponse(defaultAxiosResponse);

      expect(catchFn).not.toHaveBeenCalled();
      expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
    });

    describe("PUT", () => {
      let apiService;
      const path = "/register";
      const body = {
        email: "test@test.com",
        password: "Passwprd123!",
        displayName: "Tester",
      };

      beforeEach(() => {
        apiService = new ApiService(AUTHENTICATION);
      });

      it("should make a PUT request to the authentication microservice with correct url", () => {
        apiService.put(path, body).then(thenFn).catch(catchFn);

        const {
          config: { method },
          url,
        } = mockAxios.lastReqGet();

        expect(method).toEqual("PUT");

        expect(url).toEqual(path);

        mockAxios.mockResponse(defaultAxiosResponse);

        expect(catchFn).not.toHaveBeenCalled();
        expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
      });

      it("should make a PUT request to the authentication microservice with auth header when requiresAuth is true", () => {
        const requiresAuth = true;

        apiService.put(path, body, requiresAuth).then(thenFn).catch(catchFn);

        const {
          config: { method, headers },
        } = mockAxios.lastReqGet();

        expect(method).toEqual("PUT");

        expect(headers.Authorization).not.toBeNull();

        mockAxios.mockResponse(defaultAxiosResponse);

        expect(catchFn).not.toHaveBeenCalled();
        expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
      });

      it("should make a PUT request to the authentication microservice with correct body data", () => {
        apiService.put(path, body).then(thenFn).catch(catchFn);

        const {
          config: { data },
          url,
        } = mockAxios.lastReqGet();

        expect(data).toEqual(body);

        expect(url).toEqual(path);

        mockAxios.mockResponse(defaultAxiosResponse);

        expect(catchFn).not.toHaveBeenCalled();
        expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
      });
    });
  });

  describe("PATCH", () => {
    let apiService;
    const path = "/register";
    const body = {
      email: "test@test.com",
      password: "Passwprd123!",
      displayName: "Tester",
    };

    beforeEach(() => {
      apiService = new ApiService(AUTHENTICATION);
    });

    it("should make a PATCH request to the authentication microservice with correct url", () => {
      apiService.patch(path, body).then(thenFn).catch(catchFn);

      const {
        config: { method },
        url,
      } = mockAxios.lastReqGet();

      expect(method).toEqual("PATCH");

      expect(url).toEqual(path);

      mockAxios.mockResponse(defaultAxiosResponse);

      expect(catchFn).not.toHaveBeenCalled();
      expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
    });

    it("should make a PATCH request to the authentication microservice with auth header when requiresAuth is true", () => {
      const requiresAuth = true;

      apiService.patch(path, body, requiresAuth).then(thenFn).catch(catchFn);

      const {
        config: { method, headers },
      } = mockAxios.lastReqGet();

      expect(method).toEqual("PATCH");

      expect(headers.Authorization).not.toBeNull();

      mockAxios.mockResponse(defaultAxiosResponse);

      expect(catchFn).not.toHaveBeenCalled();
      expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
    });

    it("should make a PATCH request to the authentication microservice with correct body data", () => {
      apiService.patch(path, body).then(thenFn).catch(catchFn);

      const {
        config: { data },
        url,
      } = mockAxios.lastReqGet();

      expect(data).toEqual(body);

      expect(url).toEqual(path);

      mockAxios.mockResponse(defaultAxiosResponse);

      expect(catchFn).not.toHaveBeenCalled();
      expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
    });
  });

  describe("DELETE", () => {
    let apiService;
    const path = "/user/delete/123";

    beforeEach(() => {
      apiService = new ApiService(AUTHENTICATION);
    });

    it("should make a DELETE request to the authentication microservice with correct url", () => {
      apiService.del(path).then(thenFn).catch(catchFn);

      const {
        config: { method },
        url,
      } = mockAxios.lastReqGet();

      expect(method).toEqual("DELETE");

      expect(url).toEqual(path);

      mockAxios.mockResponse(defaultAxiosResponse);

      expect(catchFn).not.toHaveBeenCalled();
      expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
    });

    it("should make a DELETE request to the authentication microservice with auth header when requiresAuth is true", () => {
      const requiresAuth = true;

      apiService.del(path, body, requiresAuth).then(thenFn).catch(catchFn);

      const {
        config: { method, headers },
      } = mockAxios.lastReqGet();

      expect(method).toEqual("DELETE");

      expect(headers.Authorization).not.toBeNull();

      mockAxios.mockResponse(defaultAxiosResponse);

      expect(catchFn).not.toHaveBeenCalled();
      expect(thenFn).toHaveBeenCalledWith(defaultAxiosResponse);
    });
  });
});
