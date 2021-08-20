import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { inviteUser } from '../services/inviteUsers';

export const loginAsync = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await inviteUser({ email, password });
  return response.data;
});

export const inviteAsync = createAsyncThunk('invite/user', async (data) => {
  try {
    const result = await inviteUser(data);
    return result.data;
  } catch (error) {
    console.log('Error with invite user', error.message);
  }
});

const initialState = {
  userName: null,
  isLoading: false,
  isError: false,
};

const invitedUserSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(inviteAsync.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(inviteAsync.fulfilled, (state, action) => {
      state.userName = action.payload;
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(inviteAsync.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const selectInviteUserName = (state) => state.invite.userName;

export default invitedUserSlice.reducer;
