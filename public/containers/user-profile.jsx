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
    this.goToSubmitApplication = this.goToSubmitApplication.bind(this);
    this.goToViewApplication = this.goToViewApplication.bind(this);
    this.goToSubmitListing = this.goToSubmitListing.bind(this);
  }

  goToSubmitApplication() {
    this.props.updateApplicationType({ type: 'form', renterId: this.props.activeUser.id });
    browserHistory.push('/content/application');
  }

  goToSubmitListing() {
    browserHistory.push('/content/addListing');
  }

  goToViewApplication() {
    this.props.updateApplicationType({ type: 'view', renterId: this.props.activeUser.id });
    browserHistory.push('/content/application');
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
        {(this.props.activeUser.userType === 1) ? '' :
        <span>
          <button onClick={this.goToSubmitApplication} >Go to submit application</button>
          <button onClick={this.goToViewApplication} >Go to view application</button>
        </span>}
        {(this.props.activeUser.userType === 0) ? '' :
        <button onClick={this.goToSubmitListing} >Go to submit listing</button>}
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
  return bindActionCreators({ selectListing, updateApplicationType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
