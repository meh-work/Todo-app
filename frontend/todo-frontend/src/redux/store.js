import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { authReducer } from "../redux/reducers/adminReducers/authReducer";
import { todoReducer } from "../redux/reducers/adminReducers/todoReducer";
import { logger } from "redux-logger";
import { userAuthReducer } from "../redux/reducers/userReducers/userAuthReducer";
import { userTodoReducer } from "./actions/userActions/userTodoActions";

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only auth state
};

// Apply persistReducer to authReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const userPersistedAuthReducer = persistReducer(persistConfig, userAuthReducer);

// Configure Store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    userAuth: userPersistedAuthReducer,
    todos: todoReducer,
    userTodos: userTodoReducer
  },
  middleware: [thunk, logger],
  devTools: process.env.NODE_ENV !== "production",
});

// Persistor
export const persistor = persistStore(store);
