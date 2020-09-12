class TokenService {
  setAuthHeaders = (headers: any = {}, authRequired: boolean) =>
    authRequired
      ? {
          ...headers,
          Authorization: `Bearer ${this.getAuthToken().jwt}`,
        }
      : headers;

  getAuthToken = () => {
    const jwt = window.localStorage.getItem('jwt');
    const refreshToken = window.localStorage.getItem('refreshToken');
    return {
      jwt,
      refreshToken,
    };
  };

  setAuthToken = (
    data: { token: string; refreshToken: string } = {
      token: '',
      refreshToken: '',
    },
  ) => {
    window.localStorage.setItem('jwt', data?.token);
    window.localStorage.setItem('refreshToken', data?.refreshToken);
  };

  removeAuthToken = () => {
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('refreshToken');
  };
}

export default new TokenService();
