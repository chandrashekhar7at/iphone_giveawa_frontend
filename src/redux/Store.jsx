import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import userSlice from './features/AuthSlices';
import userInfo from './features/UserInfoSlice';

// Persist configuration for the auth slice
const persistConfig = {
    key: 'root', // Key for the persisted data in storage
    storage,     // Storage engine, typically localStorage
};

const persistedReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    authuser: persistedReducer, // Persisted auth slice
    userInfo: userInfo,         // Non-persisted user info slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
