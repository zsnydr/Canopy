import request from 'superagent';
import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import ToggleDisplay from 'react-toggle-display';

import ListingsListItem from './listings_list_item';

class UserProfileListingsTabs extends Component {
  constructor({ activeUser }) {
    super({ activeUser });

    this.state = {
      userListings: []
    };
  }

  componentDidMount() {
    // api call to get user Listings for this.activeUser.id
    const getUserListings = request.get(`/api/userListings/${this.activeUser.id}`);

    getUserListings.end((err, res) => {
      console.log('GOT USER LISTINGS: ', res.body.data);
      this.setState({ userListings: res.body.data.userListings });
    });
  }

  render() {
    if (!this.state.userListings.length) {
      return (
        <div>Waiting for user listings</div>
      );
    }

    return (
      <div>
        <Tabs>
          <TabList style={{ textAlign: 'center' }}>
            {this.activeUser.userType % 2 === 0 && <Tab className="profile-renter-tab">Renter</Tab>}
            {this.activeUser.userType > 0 && <Tab className="profile-host-tab">Host</Tab>}
          </TabList>
          <TabPanel>
            <Tabs>
              <TabList style={{ textAlign: 'center' }}>
                <Tab>All Saved Listings</Tab>
                <Tab>Favorited</Tab>
                <Tab>Applied</Tab>
              </TabList>
              <TabPanel>
                {this.state.userListings
                  .map(({ listing }) => { return <ListingsListItem listing={listing} />; })}
              </TabPanel>
              <TabPanel>
                {this.state.userListings
                  .filter((userListing) => { return !userListing.hasApplied; })
                  .map(({ listing }) => { return <ListingsListItem listing={listing} />; })}
              </TabPanel>
              <TabPanel>
                {this.state.userListings
                  .filter((userListing) => { return userListing.hasApplied; })
                  .map(({ listing }) => { return <ListingsListItem listing={listing} />; })}
              </TabPanel>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList style={{ textAlign: 'center' }}>
                <Tab>All Listings</Tab>
                <Tab>New Applications</Tab>
              </TabList>
              <TabPanel>
                {/*activeUser.hostListings.map((listing) => <ListingsListItem listing={listing} />)*/}
              </TabPanel>
              <TabPanel>
                {/*activeUser.hostListings
                  .filter((listing) => { return listing.newApp; })
                  .map((listing) => { return <ListingsListItem listing={listing} />; })*/}
              </TabPanel>
            </Tabs>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default UserProfileListingsTabs;
