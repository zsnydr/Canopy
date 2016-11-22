import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import UserProfileInfo from '../components/profile/user_profile_info';
import UserProfileListings from '../components/profile/user_profile_listings';
import selectListing from '../actions/select_listing';
import updateApplicationType from '../actions/update_application_type';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.activeUser || !this.props.activeUser.id) {
      return (
        <div>No user</div>
      );
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <UserProfileInfo activeUser={this.props.activeUser} />
          <UserProfileListings
            activeUser={this.props.activeUser}
            selectListing={this.props.selectListing}
          />
        </div>
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
  return bindActionCreators({ selectListing, updateApplicationType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
