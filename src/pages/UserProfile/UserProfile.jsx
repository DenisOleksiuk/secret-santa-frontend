import React from 'react';
import './UserProfile.scss';

const UserProfile = ({ inviteUserName } = 'Johnny') => {
  return (
    <div>
      <h1 style={{ color: 'wheat' }}>User Profile</h1>
      <div className="secret-message">You are secret santa for {inviteUserName}</div>
    </div>
  );
};

export default UserProfile;
