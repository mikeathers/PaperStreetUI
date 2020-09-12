import { IUser } from "models/user";

export interface IAuthState {
  user: IUser;
  errorMessages: [];
  error: boolean;
  requestInProgress: boolean;
}

export const initialAuthState: IAuthState = {
  user: {
    displayName: "",
    token: "",
    refreshToken: "",
    image: "",
    isAuthenticated: false,
  },
  errorMessages: [],
  error: false,
  requestInProgress: false,
};
