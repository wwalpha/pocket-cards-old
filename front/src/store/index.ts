import { createStore, applyMiddleware, compose, Store } from 'redux';
import logger from 'redux-logger';
import reducer from '../reducers';

const store = (): Store<any> => createStore(
  reducer,
  // (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__({
  //   serialize: {
  //     immutable: Immutable,
  //   },
  // }),
  compose(
    applyMiddleware(
      logger,
    ),
  ),
);

export default store;
