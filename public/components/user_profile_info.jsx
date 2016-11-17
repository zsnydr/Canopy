import React from 'react';

const UserProfileInfo = (props) => {
  return (
    <div>
      <h3>Welcome, {props.activeUser.name.split(' ')[0]}</h3>
    </div>
  );
};

export default UserProfileInfo;
