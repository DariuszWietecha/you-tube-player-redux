import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import * as commonTypes from "./commonTypes";
import { rootReducer } from "./reducers";

export const history = createBrowserHistory();
const loggerMiddleware = createLogger();

export default function configureStore(
  preloadedState?: commonTypes.IApplicationState,
  ) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        loggerMiddleware,
      ),
    ),
  );

  return store;
}
