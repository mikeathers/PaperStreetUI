export interface IUser {
  displayName: string;
  token: string;
  refreshToken: string;
  image?: string;
  isAuthenticated: boolean;
}

export interface IUserFormValues {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
