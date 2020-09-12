/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import { AxiosResponse } from 'axios';

declare global {
  namespace NodeJS {
    interface Global {
      defaultAxiosResponse: AxiosResponse;
    }
  }
}
