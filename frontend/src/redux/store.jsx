import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage)
import authReducer from "./authSlice";

const persistConfig = {
  key: "root",
  storage,
  // Clear storage on logout
  blacklist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredActions: [ PERSIST,PURGE,REGISTER],
        ignoredPaths: ["persist"],
      },
    }),
});

const persistor = persistStore(store);

// Example function to clear storage
const clearStorage = () => {
  persistor.purge();
  localStorage.removeItem('persist:root');
  sessionStorage.clear();
};

export { store, persistor, clearStorage };

