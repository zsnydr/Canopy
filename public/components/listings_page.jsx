import React, { Component } from 'react';
import ListingsList from '../containers/listings-list';
import GoogleMaps from './google_maps';


export default class ListingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { listings: [] };
  }

  updateListings(listings) {
    this.setState({ listings });
  }

  render() {
    return (
      <div>
        <GoogleMaps />
        <ListingsList updateListings={this.updateListings} />
      </div>
    );
  }
}
