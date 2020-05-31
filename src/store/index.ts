import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'src/reducers';
import rootSaga from 'src/saga';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f: unknown): unknown => f
  )
);

sagaMiddleware.run(rootSaga);
