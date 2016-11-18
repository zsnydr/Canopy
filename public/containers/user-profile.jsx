import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import selectListing from '../actions/select_listing';
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
        <UserProfileListings
          activeUser={this.props.activeUser}
          selectListing={this.props.selectListing}
        />
      </div>
    );
  }
}

function mapStateToProps({ activeUser }) {
  return {
    activeUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
