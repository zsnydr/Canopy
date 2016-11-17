import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserProfileInfo from '../components/user_profile_info';
import UserProfileListings from '../components/user_profile_listings';

class UserProfile extends Component {

  render() {
    if (!this.props.activeUser || !this.props.activeUser.id) {
      return (
        <div>No user</div>
      );
    }

    return (
      <div>
        <UserProfileInfo activeUser={this.props.activeUser} />
        <UserProfileListings activeUser={this.props.activeUser} />
      </div>
    );
  }
}

function mapStateToProps({ activeUser }) {
  return {
    activeUser
  };
}

export default connect(mapStateToProps)(UserProfile);
