import { ErrorHandler } from "../";
import { errorMessages } from "shared/constants";
import { User } from "services/api";
import { Router } from "../";
// import { defaultAxiosResponse } from "__mocks__/default-axios-response";

describe("Error Handler Service", () => {
  let errorHandler;
  let dispatch;

  const { defaultAxiosResponse } = global;

  const failedAction = (errorMessage: string) => ({
    type: "FAILED_ACTION",
    payload: errorMessage,
  });

  describe("handleHttpError", () => {
    beforeEach(() => {
      errorHandler = ErrorHandler;
      dispatch = jest.fn();
    });

    it("should dispatch failed action when Network Error occurs", async () => {
      const error = {
        message: errorMessages.INCOMING_NETWORK_ERROR,
        config: null,
        response: null,
      };

      try {
        await errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction(errorMessages.NETWORK_ERROR_MESSAGE)
        );
      }
    });

    it("should dispatch failed action when 404 status code received and navigate to 404 page", async () => {
      const error = {
        config: null,
        response: {
          status: 404,
          config: {},
        },
      };

      try {
        await errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction(errorMessages.NOT_FOUND_ERROR_MESSAGE)
        );
      }
    });

    it("should dispatch failed action when 401 status code received and attempt to refresh token has been made then navigate to login page", async () => {
      const error = {
        config: {
          url: "/refresh",
          _retry: true,
        },
        response: {
          status: 401,
          config: {},
        },
      };
      const pushToLoginSpy = jest.spyOn(Router, "pushToLogin");
      try {
        await errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction(errorMessages.SESSION_EXPIRED_MESSAGE)
        );
        expect(pushToLoginSpy).toHaveBeenCalled();
      }
    });

    it("should dispatch failed action when 401 status code received and navigate to login page", async () => {
      const error = {
        config: {
          url: "",
          _retry: false,
        },
        response: {
          status: 401,
          config: {},
        },
      };
      const refreshTokenSpy = jest
        .spyOn(User, "refreshToken")
        .mockResolvedValue(defaultAxiosResponse);

      try {
        await errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(refreshTokenSpy).toHaveBeenCalled();
      }
    });

    it("should dispatch failed action when 400 status code received and navigate to login page", async () => {
      const error = {
        config: {},
        response: {
          data: {
            errors: { id: "not found" },
          },
          status: 400,
          config: { method: "get" },
        },
      };

      try {
        await errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction(errorMessages.NOT_FOUND_ERROR_MESSAGE)
        );
      }
    });

    it("should dispatch failed action when 500 status", async () => {
      const error = {
        config: {},
        response: {
          data: {},
          status: 500,
          config: {},
        },
      };

      try {
        await errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction(errorMessages.SERVER_ERROR_MESSAGE)
        );
      }
    });
  });
});
