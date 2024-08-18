import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import userReducer from './userSlice';
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
});
