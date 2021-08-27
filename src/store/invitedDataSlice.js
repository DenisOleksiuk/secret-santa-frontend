import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { inviteUser } from '../services/inviteUsers';
import history from '../history';

export const loginAsync = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await inviteUser({ email, password });
  return response.data;
});

export const inviteAsync = createAsyncThunk('invite/user', async (data) => {
  try {
    const result = await inviteUser(data);
    history.push('/profile');
    return result.data;
  } catch (error) {
    throw new Error('You entered a wrong password');
  }
});

const initialState = {
  userName: null,
  wishes: [],
  isLoading: false,
  isError: false,
};

const invitedUserSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const selectInvite = (state) => state.invite;

export default invitedUserSlice.reducer;
