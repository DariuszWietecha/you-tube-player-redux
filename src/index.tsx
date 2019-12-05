// import 'babel-polyfill'

import { ConnectedRouter } from "connected-react-router";

import React from "react";
import { render } from "react-dom";
import { Provider} from "react-redux";
import { Route, Switch } from "react-router-dom";
import configureStore, { history } from "./configureStore";

import App from "./containers/App";

// const composeEnhancers =
//   typeof window === "object" &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(
//     thunkMiddleware,
//     loggerMiddleware,

//   ),
//   // other store enhancers if any
// );

const store = configureStore();
// const store = createStore(
//   rootReducer, enhancer)

// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     thunkMiddleware,
//     loggerMiddleware
//   ))
export type AppDispatch = typeof store.dispatch;
render(
  <Provider store={store}>
     <ConnectedRouter history={history}>
     <Switch>
      <Route path="/:query?" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
);
