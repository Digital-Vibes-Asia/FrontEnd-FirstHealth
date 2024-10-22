import {configureStore} from '@reduxjs/toolkit';
import value from './value';
import {persistReducer, persistStore} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import {API} from './api';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: {
    operation: persistReducer(persistConfig, value),
    [API.reducerPath]: API.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(API.middleware),
});

export const persistor = persistStore(store);
