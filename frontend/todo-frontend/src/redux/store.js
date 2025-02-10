import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { authReducer } from "../redux/reducers/adminReducers/authReducer";
import { todoReducer } from "../redux/reducers/adminReducers/todoReducer";
import { logger } from "redux-logger";
import { userTodoReducer } from "./reducers/userReducers/userTodoReducer";

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only auth state
};

// Apply persistReducer to authReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure Store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    todos: todoReducer,
    userTodos: userTodoReducer
  },
  middleware: [thunk, logger],
  devTools: process.env.NODE_ENV !== "production",
});

// Persistor
export const persistor = persistStore(store);
