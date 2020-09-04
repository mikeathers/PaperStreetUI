import { ErrorHandler } from "../";
import { errorMessages } from "../constants";
import { User } from "api";
import { Router } from "../";

describe("Error Handler Service", () => {
  let errorHandler;
  let dispatch;

  const failedAction = (errorMessage: string) => ({
    type: "FAILED_ACTION",
    payload: errorMessage,
  });

  describe("handleHttpError", () => {
    beforeEach(() => {
      errorHandler = ErrorHandler;
      dispatch = jest.fn();
    });
    it("should dispatch failed action when Network Error occurs", () => {
      const error = {
        message: errorMessages.INCOMING_NETWORK_ERROR,
        config: null,
        response: null,
      };

      try {
        errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction(errorMessages.NETWORK_ERROR_MESSAGE)
        );
      }
    });

    it("should dispatch failed action when 404 status code received and navigate to 404 page", () => {
      const error = {
        config: null,
        response: {
          status: 404,
          config: {},
        },
      };

      try {
        errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction(errorMessages.NOT_FOUND_ERROR_MESSAGE)
        );
      }
    });

    it("should dispatch failed action when 401 status code received and navigate to login page", () => {
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
        errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction(errorMessages.SESSION_EXPIRED_MESSAGE)
        );
        expect(pushToLoginSpy).toHaveBeenCalled();
      }
    });

    it("should dispatch failed action when 401 status code received and navigate to login page", () => {
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
      const refreshTokenSpy = jest.spyOn(User, "refreshToken");

      try {
        errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(refreshTokenSpy).toHaveBeenCalled();
      }
    });

    it("should dispatch failed action when 400 status code received and navigate to login page", () => {
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
        errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction(errorMessages.NOT_FOUND_ERROR_MESSAGE)
        );
      }
    });

    it("should dispatch failed action when 500 status", () => {
      const error = {
        config: {},
        response: {
          data: {},
          status: 500,
          config: {},
        },
      };

      try {
        errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction(errorMessages.SERVER_ERROR_MESSAGE)
        );
      }
    });
  });
});
