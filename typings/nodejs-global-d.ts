import { AxiosResponse } from "axios";

export {};

declare global {
  namespace NodeJS {
    interface Global {
      defaultAxiosResponse: AxiosResponse;
    }
  }
}
