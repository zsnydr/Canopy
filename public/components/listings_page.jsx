import React, { Component } from 'react';
import ListingsList from '../containers/listings-list';
import GoogleMaps from './google_maps';


export default class ListingsPage extends Component {
  constructor(props) {
    super(props);
    console.log('constructor running');
    this.state = { listings: [] };
    this.updateListings = this.updateListings.bind(this);
  }

  updateListings(listings) {
    this.setState({ listings }, () => {
    });
  }

  render() {
    if (!this.state.listings.length) {
      return (
        <div>
        <div>Waiting for data...</div>
        <ListingsList updateListings={this.updateListings} />
        </div>
      )
    }
    return (
      <div>
        <GoogleMaps />
        <ListingsList updateListings={this.updateListings} />
      </div>
    );
  }
}
