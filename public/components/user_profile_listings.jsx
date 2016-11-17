import React from 'react';

import UserProfileListingsTabs from './user_profile_listings_tabs';

const UserProfileListings = (props) => {
  return (
    <div>
      <h4>User is a {props.activeUser.userType || 'RENTER'}</h4>
      <UserProfileListingsTabs activeUser={props.activeUser} />
    </div>
  );
};

export default UserProfileListings;
