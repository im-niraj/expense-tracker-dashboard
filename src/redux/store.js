import { configureStore, } from "@reduxjs/toolkit";
import userReducer from "./slices/userInfoSlice";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.REACT_APP_PRODUCTION === "PRODUCTION" ? false : true,
    middleware: [thunk],
});

export const persistor = persistStore(store);