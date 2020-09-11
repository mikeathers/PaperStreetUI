export interface IUser {
  displayName: string;
  token: string;
  refreshToken: string;
  image?: string;
  isAuthenticated: boolean;
}

export interface IUserRegisterValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUserLoginValues {
  email: string;
  password: string;
}
