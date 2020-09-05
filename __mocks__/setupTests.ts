export const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key: string | number) {
      return store[key];
    },
    setItem(key: string | number, value: { toString: () => any }) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string | number) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
