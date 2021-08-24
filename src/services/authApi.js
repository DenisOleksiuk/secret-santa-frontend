import apiHelper from './authHelper';

const login = (data) =>
  apiHelper.post('/auth/login', { email: data.email, password: data.password });

const getCurrentUser = async () => {
  try {
    const token = window.localStorage.getItem('userData');
    const res = await apiHelper.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('from getCurrentUser', res);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const authApi = {
  login,
  getCurrentUser,
};
