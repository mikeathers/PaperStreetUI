export const localStorageMock = () => {
  let store = {
    jwt: "",
    refreshToken: "",
  };
  return {
    getItem(key: string | number) {
      return store[key];
    },
    setItem(key: string | number, value: { toString: () => any }) {
      store[key] = value.toString();
    },
    clear() {
      store = {
        jwt: "",
        refreshToken: "",
      };
    },
    removeItem(key: string | number) {
      delete store[key];
    },
  };
};

//Object.defineProperty(window, "localStorage", { value: localStorageMock });
