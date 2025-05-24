import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  name: null,
  access_token : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const {name, role, token} = action.payload;
      state.name = name;
      state.role = role;
      state.access_token = token;
      localStorage.setItem("access_token", token); // Save to localStorage
    },
    logout: (state) => {
      state.name = null;
      state.role = null;
      state.access_token = null;
      localStorage.removeItem("access_token");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;