import apiHelper from './authHelper';

export const inviteUser = async (data) =>
  await apiHelper.post(
    '/users/invite',
    {},
    {
      auth: { password: data },
    }
  );
