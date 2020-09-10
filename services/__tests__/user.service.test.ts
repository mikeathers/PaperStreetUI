import UserService, { IUserService } from "../user.service";
import TokenService from "../token.service";

jest.mock("../token.service");

const { defaultAxiosResponse } = global;

describe("UserService", () => {
  let userService: IUserService;

  beforeEach(() => {
    userService = UserService;
  });

  describe("Register", () => {
    it("should call the ApiService with the correct data", () => {
      const registerDetails = {
        email: "test@test.com",
        password: "Password123!",
        firstName: "Test",
        lastName: "User",
      };

      const registerUrl = `/authentication/register`;

      const apiServiceSpy = jest.spyOn(userService.apiService, "post");

      userService.register(registerDetails);

      expect(apiServiceSpy).toHaveBeenCalledWith(registerUrl, registerDetails);
    });
  });

  describe("Login", () => {
    it("should call the ApiService with the correct data", () => {
      const loginDetails = {
        email: "test@test.com",
        password: "Password123!",
      };

      const loginUrl = `/authentication/login`;

      const apiServiceSpy = jest.spyOn(userService.apiService, "post");

      userService.login(loginDetails);

      expect(apiServiceSpy).toHaveBeenCalledWith(loginUrl, loginDetails);
    });
  });

  describe("Refresh Token", () => {
    it("should call the ApiService with the correct data", () => {
      const token = "1010101";
      const refreshToken = "2020202";
      const refreshUrl = `/authentication/refresh`;

      const apiServiceSpy = jest.spyOn(userService.apiService, "post");

      userService.refreshToken(token, refreshToken);

      expect(apiServiceSpy).toHaveBeenLastCalledWith(refreshUrl, {
        token,
        refreshToken,
      });
    });

    it("should call the TokenService with the correct data", async () => {
      const tokenData = {
        token: "1010101",
        refreshToken: "2020202",
      };

      const successResponse = {
        ...defaultAxiosResponse,
        data: tokenData,
      };

      const tokenServiceSpy = jest.spyOn(TokenService, "setAuthToken");

      jest
        .spyOn(userService.apiService, "post")
        .mockResolvedValue(successResponse);

      await userService.refreshToken(tokenData.token, tokenData.refreshToken);

      expect(tokenServiceSpy).toHaveBeenCalledWith(tokenData);
    });

    it("should return an api response", async () => {
      const token = "1010101";
      const refreshToken = "2020202";

      jest
        .spyOn(userService.apiService, "post")
        .mockResolvedValue(defaultAxiosResponse);

      const response = await userService.refreshToken(token, refreshToken);

      expect(response).toBe(defaultAxiosResponse);
    });
  });

  describe("Logout", () => {
    it("should call the ApiService with the correct data", () => {
      const tokenServiceSpy = jest.spyOn(TokenService, "removeAuthToken");

      userService.logout();

      expect(tokenServiceSpy).toHaveBeenCalled();
    });
  });
});
