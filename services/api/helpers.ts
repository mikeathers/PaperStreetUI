const setAuthHeaders = (headers: Object = {}, requiresAuth: boolean) =>
  requiresAuth
    ? {
        ...headers,
        Authorization: `Bearer ${getAuthToken().jwt}`,
      }
    : headers;

const getAuthToken = () => {
  const jwt = window.localStorage.getItem("jwt");
  const refreshToken = window.localStorage.getItem("refreshToken");
  return {
    jwt,
    refreshToken,
  };
};

const setAuthToken = (
  data: { token: string; refreshToken: string } = {
    token: "",
    refreshToken: "",
  }
) => {
  window.localStorage.setItem("jwt", data?.token);
  window.localStorage.setItem("refreshToken", data?.refreshToken);
};

const removeAuthToken = () => {
  window.localStorage.removeItem("jwt");
  window.localStorage.removeItem("refreshToken");
};

export { setAuthHeaders, setAuthToken, getAuthToken, removeAuthToken };
