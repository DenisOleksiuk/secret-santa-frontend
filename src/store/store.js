import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import inviteSlice from './invitedDataSlice';

export const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    invite: inviteSlice,
  },
});

export default store;
