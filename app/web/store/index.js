import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './modules'

export default function configureStore (preloadedState) {
  const middlewares = [thunk]
  const enhancers = []

  if (process.env.NODE_ENV === 'development' && !window.__REDUX_DEVTOOLS_EXTENSION__) {
    console.warn('Install Redux DevTools Extension to inspect the app state: ' +
      'https://github.com/zalmoxisus/redux-devtools-extension#installation')
  }

  const composeEnhancers = (process.env.NODE_ENV === 'development')
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )

  return store
}
