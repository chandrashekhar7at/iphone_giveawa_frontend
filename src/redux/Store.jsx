import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authSlice from './features/AuthSlices';
import userInfoSlice from './features/UserInfoSlice';

// Persist configuration for the auth slice
const authPersistConfig = {
  key: 'auth', // Key for the persisted auth slice data
  storage,
};

// Persist configuration for the userInfo slice
const userInfoPersistConfig = {
  key: 'userInfo', // Key for the persisted userInfo slice data
  storage,
};

// Create persisted reducers for each slice
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedUserInfoReducer = persistReducer(userInfoPersistConfig, userInfoSlice);

// Combine the persisted reducers
const rootReducer = {
  authuser: persistedAuthReducer,
  userInfo: persistedUserInfoReducer,
};

// Configure the store with the combined persisted reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor instance
export const persistor = persistStore(store);
