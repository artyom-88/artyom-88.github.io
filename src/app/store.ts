import { configureStore } from '@reduxjs/toolkit';
import rootSaga from 'app/rootSaga';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export default store;
