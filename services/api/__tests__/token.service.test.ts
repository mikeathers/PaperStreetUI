import TokenService from "../token.service";

describe("Token Service", () => {
  let tokenService;
  const tokenData = {
    token: "101010",
    refreshToken: "202020",
  };

  beforeEach(() => {
    tokenService = TokenService;
  });

  describe("setAuthToken", () => {
    it("should set tokens in localStorage", () => {
      tokenService.setAuthToken(tokenData);

      expect(window.localStorage.getItem("jwt")).toEqual(tokenData.token);
      expect(window.localStorage.getItem("refreshToken")).toEqual(
        tokenData.refreshToken
      );
    });
  });

  describe("getAuthToken", () => {
    it("should get tokens from localStorage", () => {
      const { jwt, refreshToken } = tokenService.getAuthToken();

      expect(jwt).not.toBeNull();
      expect(refreshToken).not.toBeNull();
    });
  });

  describe("removeAuthToken", () => {
    it("should remove tokens from localStorage", () => {
      tokenService.removeAuthToken();

      expect(window.localStorage.getItem("jwt")).toBeUndefined();
      expect(window.localStorage.getItem("refreshToken")).toBeUndefined();
    });
  });

  describe("setAuthHeaders", () => {
    it("should return auth header when authRequired is true", () => {
      const authRequired = true;
      const defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const headers = tokenService.setAuthHeaders(defaultHeaders, authRequired);

      expect(headers.Authorization).not.toBeUndefined();
    });

    it("should not return auth header when authRequired is false", () => {
      const authRequired = false;
      const defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const headers = tokenService.setAuthHeaders(defaultHeaders, authRequired);

      expect(headers.Authorization).toBeUndefined();
    });
  });
});
