import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const user = action.payload || null;
      state.user = user;
      if (user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
        state.error = null;
      }
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAuth, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
