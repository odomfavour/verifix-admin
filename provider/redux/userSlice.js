import { createSlice } from '@reduxjs/toolkit';

const storedUser =
  typeof localStorage !== 'undefined'
    ? localStorage.getItem('verifixAdminUser')
    : null;
const storedCreatedVendor =
  typeof localStorage !== 'undefined'
    ? localStorage.getItem('createdVendor')
    : null;

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  activeVendor: null,
  createdVendor: storedCreatedVendor ? JSON.parse(storedCreatedVendor) : null,
  // user: {
  //   role: 'customer',
  // },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setVendor: (state, action) => {
      state.createdVendor = action.payload;
    },
    setActiveVendor: (state, action) => {
      state.activeVendor = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setVendor, logOut, setActiveVendor } =
  userSlice.actions;

export default userSlice.reducer;
