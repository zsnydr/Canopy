import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import selectListing from '../../actions/select_listing';
import ListingsListItem from '../listings_list/listings_list_item';
import updateApplicationType from '../../actions/typeToAppView';

class UserProfileListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renterListings: [],
      hostListings: [],
      newApps: [],
      favs: true,
      applied: false,
      allHost: false,
      newAppsFlag: false,
      data: false,
      userType: this.props.activeUser.userType
    };

    this.goToListing = this.goToListing.bind(this);
    this.editListing = this.editListing.bind(this);

    this.renderAllRenterListings = this.renderAllRenterListings.bind(this);
    this.renderFavoriteRenterListings = this.renderFavoriteRenterListings.bind(this);
    this.renderAppliedRenterListings = this.renderAppliedRenterListings.bind(this);

    this.renderAllHostListings = this.renderAllHostListings.bind(this);
    this.renderNewApplications = this.renderNewApplications.bind(this);
  }

  editListing(hostListing) {
    this.props.selectListing(hostListing);
    browserHistory.push(`/content/editListing/${hostListing.id}`);
  }

  goToListing(listing) {
    browserHistory.push(`/content/listing/${listing.id}`);
  }

  showApplication(renterId) {
    const context = this;
    return () => {
      context.props.updateApplicationType({ type: 'view', renterId });
      browserHistory.push('/content/application');
    }
  }

  renderAllRenterListings() {
    return this.state.renterListings.map(({ listing }) => {
      return (
        <div className="listing">
          <ListingsListItem
            listing={listing}
            city={listing.city.name}
            state={listing.city.state}
            selectListing={this.props.selectListing}
            goToListing={this.goToListing}
          />
        </div>
      );
    });
  }

  renderFavoriteRenterListings() {
    return this.state.renterListings.filter((renterListing) => {
      return !renterListing.hasApplied;
    }).map(({ listing }) => {
      return (
        <div className="listing" style={{position:'relative'}}>
          <ListingsListItem
            listing={listing}
            city={listing.city.name}
            state={listing.city.state}
            selectListing={this.props.selectListing}
            goToListing={this.goToListing}
          />
        </div>
      );
    });
  }

  renderAppliedRenterListings() {
    return this.state.renterListings.filter((renterListing) => {
      return renterListing.hasApplied;
    }).map(({ listing }) => {
      return (
        <div className="listing" style={{position:'relative'}}>
          <ListingsListItem
            listing={listing}
            city={listing.city.name}
            state={listing.city.state}
            selectListing={this.props.selectListing}
            goToListing={this.goToListing}
          />
        </div>
      );
    });
  }

  renderAllHostListings() {
    return this.state.hostListings.map((hostListing) => {
      return (
        <div className="listing">
          <ListingsListItem
            listing={hostListing}
            city={hostListing.city.name}
            state={hostListing.city.state}
            selectListing={this.props.selectListing}
            goToListing={this.goToListing}
          />
          <Button bsStyle="primary" onClick={() => { this.editListing(hostListing); }}>EDIT</Button>
        </div>
      );
    });
  }

  renderNewApplications() {
    return this.state.newApps.map((newApp) => {
      return (
        <div>
          <div>Credit Checked: {newApp[1].creditChecked ? 'YES' : 'NO'}</div>
          <div>Background Checked: {newApp[1].backgroundChecked ? 'YES' : 'NO'}</div>
          <div>Rental History: {newApp[1].hasRentalHistory ? 'YES' : 'NO'}</div>
          <div className="listing">
            <ListingsListItem
              listing={newApp[0]}
              city={newApp[0].city.name}
              state={newApp[0].city.state}
              selectListing={this.props.selectListing}
              goToListing={this.goToListing}
            />
          </div>
          <button onClick={this.showApplication(newApp[1]['renter_id'])}>View application</button>
        </div>
      );
    });
  }

  componentDidMount() {
    // api call to get user host and renter Listings for this.activeUser.id
    const getUserRenterListings = request.get(`/api/userRenterListings/${this.props.activeUser.id}`);
    const getUserHostListings = request.get(`/api/userHostListings/${this.props.activeUser.id}`);

    getUserRenterListings.end((err, res) => {
      this.setState({
        renterListings: res.body,
        data: true
      });
    });

    getUserHostListings.end((err, res) => {
      const newApps = [];
      res.body.forEach((listing) => {
        listing.renterlistings.forEach((rl) => {
          if (!rl.hostSeen) {
            newApps.push([listing, rl]);
          }
        });
      });
      this.setState({
        hostListings: res.body,
        data: true,
        newApps
      });
    });
  }

  render() {
    if (!this.state.data) {
      return (
        <div>Waiting for user listings</div>
      );
    }

    return (
      <div className="col-md-6">
        {this.props.activeUser.userType === 2 && <Button bsStyle="primary" onClick={() => { this.setState({ newAppsFlag: false, allHost: false, favs: true, applied: false }); }}>RENTER</Button>}
        {this.props.activeUser.userType === 2 && <Button bsStyle="primary" onClick={() => { this.setState({ newAppsFlag: false, allHost: true, applied: false, favs: false }); }}>HOST</Button>}
        {this.state.userType % 2 === 0 && <Button bsStyle="primary" onClick={() => { this.setState({ newAppsFlag: false, allHost: false, favs: true, applied: false }); }}>FAVS</Button>}
        {this.state.userType % 2 === 0 && <Button bsStyle="primary" onClick={() => { this.setState({ newAppsFlag: false, allHost: false, applied: true, favs: false }); }}>APPLIED</Button>}
        {this.state.userType > 0 && <Button bsStyle="primary" onClick={() => { this.setState({ newAppsFlag: false, allHost: true, applied: false, favs: false }); }}>MY LISTINGS</Button>}
        {this.state.userType > 0 && <Button bsStyle="primary" onClick={() => { this.setState({ newAppsFlag: true, allHost: false, applied: false, favs: false }); }}>NEW APPLICATIONS</Button>}
        <div className="listingsPage">
          <div className="listings_list">
            {this.state.favs && this.renderFavoriteRenterListings()}
            {this.state.applied && this.renderAppliedRenterListings()}
            {this.state.allHost && this.renderAllHostListings()}
            {this.state.newAppsFlag && this.renderNewApplications()}
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing, updateApplicationType }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserProfileListings);
