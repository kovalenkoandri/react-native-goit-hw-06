import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    emailValue: null,
    passwordValue: null,
  },
  reducers: {},
});
