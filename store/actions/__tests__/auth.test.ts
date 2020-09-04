import {
  register,
  registerRequest,
  registerSuccessful,
  registerFailed,
} from "..";

import { User } from "api";
import { Router, ErrorHandler } from "services";

describe("User actions", () => {
  const dispatch = jest.fn();

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
        await register(userRegisterDetails)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(registerRequest());
      });

      it("should call User.register", async () => {
        await register(userRegisterDetails)(dispatch);
        expect(User.register).toBeCalled();
      });
    });

    describe("Register Success", () => {
      beforeEach(() => {
        jest.spyOn(User, "register").mockResolvedValue(mockedSuccessResponse);
      });

      it("should dispatch register success action", async () => {
        await register(userRegisterDetails)(dispatch);
        expect(dispatch).toHaveBeenLastCalledWith(
          registerSuccessful(mockedSuccessResponse.data)
        );
      });

      it("should push to the dashbaord page", async () => {
        const pushToHomeSpy = jest.spyOn(Router, "pushToHome");
        await register(userRegisterDetails)(dispatch);
        expect(pushToHomeSpy).toHaveBeenCalled();
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

      it("should call handleHttpError", async () => {
        const handleHttpErrorSpy = jest.spyOn(ErrorHandler, "handleHttpError");
        try {
          await register(userRegisterDetails)(dispatch);
        } catch {
          expect(handleHttpErrorSpy).toHaveBeenCalledWith(
            mockedErrorResponse,
            dispatch,
            registerFailed
          );
        }
      });
    });
  });
});
