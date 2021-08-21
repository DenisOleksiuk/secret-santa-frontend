import React from 'react';
import { useSelector } from 'react-redux';
import { selectInviteUserName } from '../../store/invitedDataSlice';
import './UserProfile.scss';

const UserProfile = () => {
  const inviteUserName = useSelector(selectInviteUserName);

  if (!inviteUserName) {
    return (
      <h1 className="wish-message">
        Oops something went wrong and we can't get a name of your friend
      </h1>
    );
  }

  return (
    <div>
      <h1 style={{ color: 'wheat' }}>User Profile</h1>
      <div className="secret-message">
        You are secret santa for <span className="secret-name">{inviteUserName}</span>
      </div>
    </div>
  );
};

export default UserProfile;
