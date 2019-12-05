import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./reducers";

export const history = createBrowserHistory();
const loggerMiddleware = createLogger();

export default function configureStore(
  // preloadedState?: RootState
  ) {
  const store = createStore(
    rootReducer(history), // root reducer with router state
    // preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware,
        loggerMiddleware, // ... other middlewares ...
      ),
    ),
  );

  return store;
}
