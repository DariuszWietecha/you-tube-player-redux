// import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import rootReducer from './reducers'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { ConnectedRouter } from 'connected-react-router'

const loggerMiddleware = createLogger()

const history = createBrowserHistory()

function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware,
        loggerMiddleware// ... other middlewares ...
      ),
    ),
  )

  return store
}


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
    
  ),
  // other store enhancers if any
);



const store = configureStore()
// const store = createStore(
//   rootReducer, enhancer)

// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     thunkMiddleware,
//     loggerMiddleware    
//   ))

render(
  <Provider store={store}>
     <ConnectedRouter history={history}>
     <Switch>
      <Route path="/:query?" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
