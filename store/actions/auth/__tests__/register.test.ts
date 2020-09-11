import {
  register,
  registerRequest,
  registerSuccessful,
  registerFailed,
} from "../..";
import {
  RouterService,
  ErrorHandlerService,
  TokenService,
  UserService,
} from "services";
import { store } from "store";

const { defaultAxiosResponse } = global;

jest.mock("services/router.service");
jest.mock("services/errorHandler.service");
jest.mock("services/token.service");
jest.mock("store");

describe("Register actions", () => {
  const mockedSuccessResponse = {
    ...defaultAxiosResponse,
    data: {
      displayName: "Test User",
      token: "101010101010",
      refreshToken: "202020202",
      isAuthenticated: true,
      authenticationError: "",
    },
  };

  const userRegisterDetails = {
    email: "test@test.com",
    password: "Password1",
    firstName: "Test",
    lastName: "User",
  };

  describe("Register Request", () => {
    beforeEach(() => {
      jest
        .spyOn(UserService, "register")
        .mockResolvedValue(mockedSuccessResponse);
    });

    it("should dispatch a register request action", async () => {
      await register(userRegisterDetails);
      expect(store.dispatch).toHaveBeenCalledWith(registerRequest());
    });

    it("should call User.register", async () => {
      await register(userRegisterDetails);
      expect(UserService.register).toBeCalledWith(userRegisterDetails);
    });
  });

  describe("Register Success", () => {
    beforeEach(() => {
      jest
        .spyOn(UserService, "register")
        .mockResolvedValue(mockedSuccessResponse);
    });

    it("should dispatch register success action", async () => {
      await register(userRegisterDetails);
      expect(store.dispatch).toHaveBeenLastCalledWith(
        registerSuccessful(mockedSuccessResponse.data)
      );
    });

    it("should call the TokenServie to save the jwt token", async () => {
      await register(userRegisterDetails);
      expect(TokenService.setAuthToken).toHaveBeenCalledWith(
        mockedSuccessResponse.data
      );
    });

    it("should push to the home page", async () => {
      await register(userRegisterDetails);
      expect(RouterService.pushToHome).toHaveBeenCalled();
    });
  });

  describe("Register Failed", () => {
    const mockedErrorResponse = {
      config: {},
      response: {
        data: {},
        status: 400,
        statusText: "",
        headers: {},
        config: {},
      },
    };

    beforeEach(() => {
      jest
        .spyOn(UserService, "register")
        .mockRejectedValue(mockedErrorResponse);
    });

    it("should call handleHttpError", async () => {
      const handleHttpErrorSpy = jest.spyOn(
        ErrorHandlerService,
        "handleHttpError"
      );
      try {
        await register(userRegisterDetails);
      } catch {
        expect(handleHttpErrorSpy).toHaveBeenCalledWith(
          mockedErrorResponse,
          store.dispatch,
          registerFailed
        );
      }
    });
  });
});
