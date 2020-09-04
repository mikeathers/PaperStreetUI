import authReducer, { initialState } from "../auth";
import * as types from "../../types";

describe("User Reducer", () => {
  describe("Register", () => {
    it("should reduce the state by REGISTER_REQUEST action type", () => {
      const registerRequestAction = {
        type: types.REGISTER_REQUEST,
      };

      const result = authReducer(initialState, registerRequestAction);

      expect(result).toEqual({ ...initialState, requestInProgress: true });
    });

    it("should reduce the state by REGISTER_SUCCESS action type", () => {
      const user = {
        displayName: "Test User",
        token: "123",
        refreshToken: "123",
        image: null,
        isAuthenticated: true,
      };

      const registerSuccessAction = {
        type: types.REGISTER_SUCCESS,
        payload: user,
      };

      const result = authReducer(initialState, registerSuccessAction);

      expect(result).toEqual({
        ...initialState,
        user,
      });
    });

    it("should reduce the state by REGISTER_FAILED action type", () => {
      const errorMessage = "Request failed";

      const registerFailedAction = {
        type: types.REGISTER_FAILED,
        payload: errorMessage,
      };

      const result = authReducer(initialState, registerFailedAction);

      expect(result).toEqual({
        ...initialState,
        error: true,
        errorMessage,
      });
    });
  });
});
