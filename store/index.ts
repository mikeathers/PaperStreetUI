import { createStore, applyMiddleware, Middleware } from "redux";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { format } from "url";
import {
  createRouterMiddleware,
  initialRouterState,
} from "connected-next-router";
import Router from "next/router";
import rootReducer, { RootState } from "./reducers";
import { initialState as userInitialState } from "./reducers/auth";
import { AppContext } from "next/app";

const routerMiddleware = createRouterMiddleware();

const bindMiddleware = (middleware: [Middleware]) => {
  const { composeWithDevTools } = require("redux-devtools-extension");
  return composeWithDevTools(applyMiddleware(...middleware, thunk));
};

const initialState = () => {
  const { asPath, pathname, query } = Router.router || {};
  let initialState;
  if (asPath) {
    const url = format({ pathname, query });
    initialState = {
      auth: userInitialState,
      router: initialRouterState(url, asPath),
    };
  }
  return initialState;
};

// const reducer: Reducer<RootState, AnyAction> = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     if (typeof window !== "undefined" && state?.router) {
//       // preserve router value on client side navigation
//       nextState.router = state.router;
//     }
//     return nextState;
//   } else {
//     return rootReducer(state, action);
//   }
// };

export const store = createStore(
  rootReducer,
  initialState(),
  bindMiddleware([routerMiddleware])
);

export const initStore: MakeStore<RootState> = (context: Context) => {
  const { asPath, pathname, query } =
    (context as AppContext).ctx || Router.router || {};
  let initialState;
  if (asPath) {
    const url = format({ pathname, query });
    initialState = {
      router: initialRouterState(url, asPath),
    };
  }
  return createStore(
    rootReducer,
    initialState,
    bindMiddleware([routerMiddleware])
  );
};

export const wrapper = createWrapper(initStore, { debug: true });
