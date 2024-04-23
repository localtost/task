import {orders} from './rtkq/orders.rtkq.ts';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
// @ts-ignore
import {createLogger} from 'redux-logger';

const logger = createLogger({
  // ...options
});

const rootReducer = combineReducers({
  [orders.reducerPath]: orders.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(orders.middleware, logger),
});

setupListeners(store.dispatch);
export default store;
