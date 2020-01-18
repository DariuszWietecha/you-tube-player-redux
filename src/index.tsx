import { ConnectedRouter } from "connected-react-router";

import React from "react";
import { render } from "react-dom";
import { Provider} from "react-redux";
import { Route, Switch } from "react-router-dom";
import configureStore, { history } from "./configureStore";
import App from "./containers/App";

const store = configureStore();

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
