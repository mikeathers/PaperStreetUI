import { push } from "connected-next-router";
import { routes } from "shared/constants";
import { store } from "store";

class RouterService {
  dispatch: any;
  constructor() {
    this.dispatch = store.dispatch;
  }
  pushToHome = () => {
    this.dispatch(push(routes.HOME));
  };
  pushToPageNotFound = () => {
    this.dispatch(push(routes.NOT_FOUND));
  };
  pushToLogin = () => {
    this.dispatch(push(routes.LOGIN));
  };
}

export default new RouterService();
