import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import selectListing from '../actions/select_listing';
import UserProfileInfo from '../components/profile/user_profile_info';
import UserProfileListings from '../components/profile/user_profile_listings';

class UserProfile extends Component {
  goToApplication() {
    browserHistory.push('/content/application/form');
  }

  render() {
    if (!this.props.activeUser || !this.props.activeUser.id) {
      return (
        <div>No user</div>
      );
    }

    return (
      <div>
        <UserProfileInfo activeUser={this.props.activeUser} />
        <button onClick={this.goToApplication} >Submit Application</button>
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
