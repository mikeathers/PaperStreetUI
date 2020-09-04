import { IAuthState, initialState as userInitialState } from "./reducers/auth";

export type RootState = {
  type: string;
  auth: IAuthState;
};

export const rootState: RootState = {
  type: "",
  auth: userInitialState,
};
