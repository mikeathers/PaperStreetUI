import { ErrorHandlerService } from "../";
import { errorMessages } from "shared/constants";

describe("Error Handler Service", () => {
  let errorHandler;
  let dispatch;

  const failedAction = (errorMessages: Array<string>) => ({
    type: "FAILED_ACTION",
    payload: errorMessages,
  });

  describe("handleHttpError", () => {
    beforeEach(() => {
      errorHandler = ErrorHandlerService;
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
          failedAction([errorMessages.NETWORK_ERROR_MESSAGE])
        );
      }
    });

    it("should dispatch failed action when 404 status code received and navigate to 404 page", async () => {
      const error = {
        data: {},
        status: 404,
        config: { method: "get" },
      };

      try {
        await errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(
          failedAction([errorMessages.NOT_FOUND_ERROR_MESSAGE])
        );
      }
    });

    it("should dispatch failed action when 400 status code received and navigate to login page", async () => {
      const error = {
        data: { errors: ["not found"] },
        status: 400,
        config: { method: "get" },
      };

      try {
        await errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(failedAction(error.data.errors));
      }
    });

    it("should dispatch failed action when 500 status", async () => {
      const error = {
        data: { errors: ["not found"] },
        status: 400,
        config: { method: "get" },
      };

      try {
        await errorHandler.handleHttpError(error, dispatch, failedAction);
      } catch {
        expect(dispatch).toHaveBeenCalledWith(failedAction(error.data.errors));
      }
    });
  });
});
