import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfiguration = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfiguration, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
