import apiHelper from './authHelper';

const login = (data) =>
  apiHelper.post('/auth/login', { email: data.email, password: data.password });

const getCurrentUser = async () =>
  apiHelper.post('/users/me', {
    token: window.localStorage.getItem('userData'),
  });

export const authApi = {
  login,
  getCurrentUser,
};
