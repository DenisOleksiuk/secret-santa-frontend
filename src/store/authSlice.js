import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '../history';
import { authApi } from '../services/authApi';

const initialState = {
  user: null,
  isLoading: true,
  error: false,
};

export const loginAsync = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await authApi.login({ email, password });
  return response.data;
});

export const fetchCurrentUserAsync = createAsyncThunk(
  'auth/fetchCurrentUser',
  async () => {
    try {
      return await authApi.getCurrentUser();
    } catch (error) {
      history.push('/login');
      throw new Error(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload.user;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLoginError = true;
      })
      .addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUserAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const selectUser = (state) => state.auth;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
