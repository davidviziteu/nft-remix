import {ThunkAction, Action, createStore, configureStore} from '@reduxjs/toolkit';
import accountReducer from "../reducers/accountReducer";
import siteInfoReducer from "../reducers/infoReducer";
import modalReducer from "../reducers/modalReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "@reduxjs/toolkit";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  account: accountReducer,
  info: siteInfoReducer,
  modal: modalReducer
})

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
