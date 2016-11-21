import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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
      data: false
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
    console.log("HOST LISTING ", hostListing)
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

  renderAppliedRenterListings() {
    return this.state.renterListings.filter((renterListing) => {
      return renterListing.hasApplied;
    }).map(({ listing }) => {
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
      <div>
        <Tabs>
          <TabList style={{ textAlign: 'center' }}>
            {this.props.activeUser.userType % 2 === 0 && <Tab className="profile-renter-tab">Renter</Tab>}
            {this.props.activeUser.userType > 0 && <Tab className="profile-host-tab">Host</Tab>}
          </TabList>
          {this.props.activeUser.userType % 2 === 0 &&
          <TabPanel>
            <Tabs>
              <TabList style={{ textAlign: 'center' }}>
                <Tab>All Saved Listings</Tab>
                <Tab>Favorited</Tab>
                <Tab>Applied</Tab>
              </TabList>
              <TabPanel className="listingsPage">
                <div className="listings_list">
                  {this.renderAllRenterListings()}
                </div>
              </TabPanel>
              <TabPanel className="listingsPage">
                <div className="listings_list">
                  {this.renderFavoriteRenterListings()}
                </div>
              </TabPanel>
              <TabPanel className="listingsPage">
                <div className="listings_list">
                  {this.renderAppliedRenterListings()}
                </div>
              </TabPanel>
            </Tabs>
          </TabPanel>}
          {this.props.activeUser.userType > 0 &&
          <TabPanel>
            <Tabs>
              <TabList style={{ textAlign: 'center' }}>
                <Tab>All Listings</Tab>
                <Tab>New Applications</Tab>
              </TabList>
              <TabPanel className="listingsPage">
                <div className="listings_list">
                  {this.renderAllHostListings()}
                </div>
              </TabPanel>
              <TabPanel className="listingsPage">
                <div className="listings_list">
                  {this.renderNewApplications()}
                </div>
              </TabPanel>
            </Tabs>
          </TabPanel>}
        </Tabs>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing, updateApplicationType }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserProfileListings);
