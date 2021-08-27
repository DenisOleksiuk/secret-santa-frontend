import apiHelper from './authHelper';

export const inviteUser = async (data) =>
  await apiHelper.post(
    '/users/invite',
    {},
    {
      auth: { password: data },
    }
  );

export const getReceiverWishlist = async (data) => {
  return await apiHelper.get(`/users/receiver/${data}`);
};
