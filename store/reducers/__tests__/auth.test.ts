import authReducer, { authInitialState } from "../auth";
import * as types from "../../types";

describe("User Reducer", () => {
  describe("Register", () => {
    it("should reduce the state by REGISTER_REQUEST action type", () => {
      const registerRequestAction = {
        type: types.REGISTER_REQUEST,
      };

      const result = authReducer(authInitialState, registerRequestAction);

      expect(result).toEqual({ ...authInitialState, requestInProgress: true });
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

      const result = authReducer(authInitialState, registerSuccessAction);

      expect(result).toEqual({
        ...authInitialState,
        user,
      });
    });

    it("should reduce the state by REGISTER_FAILED action type", () => {
      const errorMessage = "Request failed";

      const registerFailedAction = {
        type: types.REGISTER_FAILED,
        payload: errorMessage,
      };

      const result = authReducer(authInitialState, registerFailedAction);

      expect(result).toEqual({
        ...authInitialState,
        error: true,
        errorMessage,
      });
    });
  });
});
