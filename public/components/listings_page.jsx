import React, { Component } from 'react';
import ListingsList from '../containers/listings-list';
import GoogleMaps from './google_maps';
import CitySearch from '../containers/city-search';

export default class ListingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      focalLat: 0,
      focalLon: 0
    };
    this.updateListings = this.updateListings.bind(this);
  }

  updateListings(listingData) {
    this.setState({
      listings: listingData.listings,
      focalLat: listingData.lat,
      focalLon: listingData.lon
    });
  }

  render() {
    if (!this.state.listings || !this.state.listings.length) {
      return (
        <div className='listingsPage'>
          <div>Waiting for data...</div>
          <ListingsList updateListings={this.updateListings} />
        </div>
      )
    }
    return (
      <div className='listingsPage'>
        <div className='listings_list'>
          //include citySearch here
          <ListingsList updateListings={this.updateListings} />
        </div>
        <div className='listings_map'>
          <GoogleMaps
            listings={this.state.listings}
            focalLat={this.state.focalLat}
            focalLon={this.state.focalLon} />
        </div>

      </div>
    );
  }
}
