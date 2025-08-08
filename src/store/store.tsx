import { combineReducers, configureStore, type ThunkAction, type UnknownAction } from '@reduxjs/toolkit';

import { redirect } from 'react-router-dom';
import { appReducer } from './reducers/app/app.store';

const combinedReducer = combineReducers({
  app: appReducer,
});


export const store = configureStore({
  reducer: combinedReducer,
})


const extraArgument = {
  redirect
};

(window as any).__store__ = store;
export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = typeof store.dispatch;
// export type AppThunkDispatch = ThunkDispatch<RootState, typeof extraArgument, AnyAction>;
export type AppStore = typeof store;



// Декларация для расширения BaseQueryApi

export type AppThunkDispatch<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  typeof extraArgument,
  UnknownAction
>
