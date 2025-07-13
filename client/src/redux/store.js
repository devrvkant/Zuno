import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice.js";
import { authApi } from "../features/auth/authApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
