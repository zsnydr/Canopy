import React from 'react';

const UserProfileInfo = ({ activeUser }) => {
  return (
    <div>
      <h3>Welcome, {activeUser.name.split(' ')[0]}</h3>
    </div>
  );
};

export default UserProfileInfo;
