import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import ToggleDisplay from 'react-toggle-display';

// import ListingsListItem from './listings_list_item';

const UserProfileListingsTabs = (props) => {
  return (
    <div>
      <Tabs>
        <TabList style={{ textAlign: 'center' }}>
          { (props.activeUser.userType === '"renter"') && <Tab className="profile-renter-tab">Renter</Tab> }
          { (props.activeUser.userType === '"host"') && <Tab className="profile-host-tab">Host</Tab> }
          <Tab>Host</Tab>
        </TabList>
        <TabPanel>
          <Tabs>
            <TabList style={{ textAlign: 'center' }}>
              <Tab>All Listings</Tab>
              <Tab>Favorited Listings</Tab>
              <Tab>Applied Listings</Tab>
            </TabList>
            <TabPanel>
              {/*props.activeUser.renterListings.map((listing) => <ListingsListItem listing={listing} />)*/}
            </TabPanel>
            <TabPanel>
              {/*props.activeUser.renterListings
                .filter((listing) => { return listing.favorite; })
                .map((listing) => { return <ListingsListItem listing={listing} />; })*/}
            </TabPanel>
            <TabPanel>
              {/*props.activeUser.renterListings
                .filter((listing) => { return listing.applied; })
                .map((listing) => { return <ListingsListItem listing={listing} />; })*/}
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
              {/*props.activeUser.hostListings.map((listing) => <ListingsListItem listing={listing} />)*/}
            </TabPanel>
            <TabPanel>
              {/*props.activeUser.hostListings
                .filter((listing) => { return listing.newApp; })
                .map((listing) => { return <ListingsListItem listing={listing} />; })*/}
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default UserProfileListingsTabs;
