import {
  register,
  registerRequest,
  registerSuccessful,
  registerFailed,
} from "..";

import { User } from "services/api";
import { Router, ErrorHandler } from "services";
import { store } from "store";

jest.mock("services/router.service");
jest.mock("services/errorHandler.service");
jest.mock("store");

describe("User actions", () => {
  describe("Register", () => {
    const userRegisterDetails = {
      email: "test@test.com",
      password: "Password1",
      displayName: "Test User2",
    };

    const mockedSuccessResponse = {
      data: {
        displayName: "Test User",
        token: "101010101010",
        refreshToken: "202020202",
        isAuthenticated: true,
        authenticationError: "",
      },
      status: 200,
      statusText: "",
      headers: {},
      config: {},
    };

    describe("Register Request", () => {
      beforeEach(() => {
        jest.spyOn(User, "register").mockResolvedValue(mockedSuccessResponse);
      });

      it("should dispatch a register request action", async () => {
        await register(userRegisterDetails);
        expect(store.dispatch).toHaveBeenCalledWith(registerRequest());
      });

      it("should call User.register", () => {
        register(userRegisterDetails);
        expect(User.register).toBeCalled();
      });
    });

    describe("Register Success", () => {
      beforeEach(() => {
        jest.spyOn(User, "register").mockResolvedValue(mockedSuccessResponse);
      });

      it("should dispatch register success action", async () => {
        await register(userRegisterDetails);
        expect(store.dispatch).toHaveBeenLastCalledWith(
          registerSuccessful(mockedSuccessResponse.data)
        );
      });

      it("should push to the dashbaord page", () => {
        register(userRegisterDetails);
        expect(Router.pushToHome).toHaveBeenCalled();
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
        jest.spyOn(User, "register").mockRejectedValue(mockedErrorResponse);
      });

      it("should call handleHttpError", () => {
        const handleHttpErrorSpy = jest.spyOn(ErrorHandler, "handleHttpError");
        try {
          register(userRegisterDetails);
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
});
