import cartReducer from "./cartReducer";
import promoCodeReducer from "./promoCodeReducer";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
};

const persistedReducerCart = persistReducer(persistConfig, cartReducer);
const persistedReducerPromo = persistReducer(persistConfig, promoCodeReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducerCart,
    promo: persistedReducerPromo,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
