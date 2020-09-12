import { format } from 'url';
import {
  createStore,
  applyMiddleware,
  Middleware,
  Reducer,
  AnyAction,
} from 'redux';
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import {
  createRouterMiddleware,
  initialRouterState,
} from 'connected-next-router';
import Router from 'next/router';
import { composeWithDevTools } from 'redux-devtools-extension';

import { AppContext } from 'next/app';
import rootReducer, { RootState } from './reducers';
import { initialAuthState } from './reducers/auth';

const routerMiddleware = createRouterMiddleware();

const bindMiddleware = (middleware: [Middleware]) => {
  return composeWithDevTools(applyMiddleware(...middleware, thunk));
};

export const initialState = (): RootState => {
  const { asPath, pathname, query } = Router.router || {};
  let initialState;
  if (asPath) {
    const url = format({ pathname, query });
    initialState = {
      auth: initialAuthState,
      router: initialRouterState(url, asPath),
    };
  }
  return initialState;
};

const reducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
    }
    return nextState;
  }
  return rootReducer(state, action);
};

export const store = createStore(
  reducer,
  initialState(),
  bindMiddleware([routerMiddleware]),
);

export const initStore: MakeStore<RootState> = (context: Context) => {
  const { asPath, pathname, query } =
    (context as AppContext).ctx || Router.router || {};
  let initialState;
  if (asPath) {
    const url = format({ pathname, query });
    initialState = {
      auth: initialAuthState,
      router: initialRouterState(url, asPath),
    };
  }
  return createStore(reducer, initialState, bindMiddleware([routerMiddleware]));
};

export const wrapper = createWrapper(initStore, { debug: true });
