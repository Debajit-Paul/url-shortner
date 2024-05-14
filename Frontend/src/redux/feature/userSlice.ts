import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogIn: (state, action) => {
      state.user = action.payload;
    },
    userLogOut: (state) => {
      state.user = null;
    },
  },
});

export const { userLogIn, userLogOut } = userSlice.actions;
export default userSlice.reducer;
