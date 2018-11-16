import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__();

const initialState = {};

export const configureStore = () => {
  // const store = createStore(
  //   rootReducer, 
  //   initialState,
  //   enhancers,
  //   applyMiddleware(thunk)
  // );
  const store = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)(rootReducer);
  return store;
}