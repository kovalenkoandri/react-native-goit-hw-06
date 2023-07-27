import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./auth/authReducer";

import reactotron from './ReactotronConfig';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [reactotron.createEnhancer()],
});
