import authReducer, { authInitialState } from "../auth";
import * as types from "../../types";

describe("User Reducer", () => {
  describe("Register", () => {
    it("should reduce the state by REGISTER_REQUEST action type", () => {
      const registerRequestAction = {
        type: types.REGISTER_REQUEST,
      };

      const result = authReducer(authInitialState, registerRequestAction);

      expect(result).toEqual({
        ...authInitialState,
        requestInProgress: true,
      });
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
      const errorMessages = ["Request failed"];

      const registerFailedAction = {
        type: types.REGISTER_FAILED,
        payload: errorMessages,
      };

      const result = authReducer(authInitialState, registerFailedAction);

      expect(result).toEqual({
        ...authInitialState,
        error: true,
        errorMessages,
      });
    });
  });

  describe("Login", () => {
    it("should reduce the state by LOGIN_REQUEST action type", () => {
      const loginRequestAction = {
        type: types.LOGIN_REQUEST,
      };

      const result = authReducer(authInitialState, loginRequestAction);

      expect(result).toEqual({
        ...authInitialState,
        requestInProgress: true,
      });
    });

    it("should reduce the state by LOGIN_SUCCESS action type", () => {
      const user = {
        displayName: "Test User",
        token: "123",
        refreshToken: "123",
        image: null,
        isAuthenticated: true,
      };

      const loginSuccessAction = {
        type: types.LOGIN_SUCCESS,
        payload: user,
      };

      const result = authReducer(authInitialState, loginSuccessAction);

      expect(result).toEqual({
        ...authInitialState,
        user,
      });
    });

    it("should reduce the state by LOGIN_FAILED action type", () => {
      const errorMessages = ["Request failed"];

      const loginFailedAction = {
        type: types.LOGIN_FAILED,
        payload: errorMessages,
      };

      const result = authReducer(authInitialState, loginFailedAction);

      expect(result).toEqual({
        ...authInitialState,
        error: true,
        errorMessages,
      });
    });
  });

  describe("Logout", () => {
    it("should reduce the state by LOGOUT_REQUEST action type", () => {
      const logoutRequestAction = {
        type: types.LOGOUT_REQUEST,
      };

      const result = authReducer(authInitialState, logoutRequestAction);

      expect(result).toEqual({
        ...authInitialState,
        requestInProgress: true,
      });
    });

    it("should reduce the state by LOGOUT_FAILED action type", () => {
      const errorMessages = ["Request failed"];

      const user = {
        displayName: "Test User",
        token: "123",
        refreshToken: "123",
        image: "",
        isAuthenticated: true,
      };

      const loggedInState = {
        ...authInitialState,
        user,
      };

      const logoutFailedAction = {
        type: types.LOGOUT_FAILED,
        payload: errorMessages,
      };

      const result = authReducer(loggedInState, logoutFailedAction);

      expect(result).toEqual({
        ...loggedInState,
        error: true,
        errorMessages,
      });
    });

    it("should reduce the state by LOGOUT_SUCCESS action type", () => {
      const logoutFailedAction = {
        type: types.LOGOUT_SUCCESS,
      };

      const result = authReducer(authInitialState, logoutFailedAction);

      expect(result).toEqual({
        ...authInitialState,
      });
    });
  });
});
