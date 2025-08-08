
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

import { createSelector } from '@reduxjs/toolkit';
import type { AppDispatch, AppStore, AppThunkDispatch, store } from './store';


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore =  useStore.withTypes<AppStore>();
export const createAppSelector = createSelector.withTypes<any>();


useStore
// export const createThunk = <P extends any, RT>(cb:  (payload?: P) => AppThunkDispatch<RT>) => (args:P) => cb(args);

export const createThunk = <T>(cb: (payload: T) => AppThunkDispatch) => {
  return cb
};
export const useAppSelector: TypedUseSelectorHook<any> = (cb) =>
  useSelector(cb, (prev, next) => {
    if (Array.isArray(prev) && Array.isArray(next)) {
      const is = resultEqualityCheckArray(prev as [], next as []);
      return is;
    } else {
      return prev === next;
    }
  });

const resultEqualityCheckArray = (prev: [], next: []) => {
  let flag = true; //Не перерендэривать

  if (prev.length !== next.length) {
    return false;
  }
  if (prev.length === next.length) {
    for (let i = 0; i < prev.length; i++) {
      if (prev[i] !== next[i]) {
        flag = false;
        break;
      }
    }
  }
  return flag;
};

// export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, undefined, UnknownAction | AnyAction>>();
// export const useAppStore = () => useStore<RootState>();
