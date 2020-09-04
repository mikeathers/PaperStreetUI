import { createStore, applyMiddleware, Middleware } from "redux";
import { AppContext } from "next/app";
import { MakeStore, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { format } from "url";
import {
  createRouterMiddleware,
  initialRouterState,
} from "connected-next-router";
import Router from "next/router";
import rootReducer, { RootState } from "./reducers";
import { rootState } from "./initial-state";

const routerMiddleware = createRouterMiddleware();

const middleware = [thunk, routerMiddleware];

const bindMiddleware = (middleware: [Middleware]) => {
  const { composeWithDevTools } = require("redux-devtools-extension");
  return composeWithDevTools(applyMiddleware(...middleware));
};

export const store = createStore(
  rootReducer,
  rootState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const initStore: MakeStore<RootState> = (context) => {
  const { asPath, pathname, query } =
    (context as AppContext).ctx || Router.router || {};
  let initialState;
  if (asPath) {
    const url = format({ pathname, query });
    initialState = {
      ...rootState,
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
