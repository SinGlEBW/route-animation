import { InitialStateProps } from './app.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './app.initial';

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActivitySlide: (state, { payload }: PayloadAction<InitialStateProps['activitySlider']>) => {
      if (payload && Object.entries(payload).length) {
        state.activitySlider = { ...state.activitySlider, ...payload };
      } else {
        state.activitySlider = { keyName: "", from: "" };
      }
    },
  },
  selectors: {
    getActivitySlider: (state) => state.activitySlider,
  },
})

export const appSelectors = appSlice.selectors;
export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;