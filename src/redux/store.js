import { configureStore } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import userRegister from "./userRegister"
import user from "./user"

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
}

const userRegisterConfig = {
  key: "register",
  version: 1,
  storage: AsyncStorage,
}

const userRegisterConfigPersisted = persistReducer(
  userRegisterConfig,
  userRegister,
)
const persistedReducer = persistReducer(persistConfig, user)

export const store = configureStore({
  reducer: { user: persistedReducer, register: userRegisterConfigPersisted },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store)
