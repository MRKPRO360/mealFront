import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cartSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from './storage';

const persistOptions = {
  key: 'cart',
  storage,
};

const persistCart = persistReducer(persistOptions, cartSlice);

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: persistCart,
    },
    middleware: (getDefaultMiddlewares: any) =>
      getDefaultMiddlewares({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
