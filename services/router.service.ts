import { push } from "connected-next-router";
import { routes } from "./constants";

class Router {
  constructor() {}

  pushToHome() {
    push(routes.HOME);
  }
  pushToPageNotFound() {
    push(routes.NOT_FOUND);
  }
  pushToLogin() {
    push(routes.LOGIN);
  }
}

export default new Router();
