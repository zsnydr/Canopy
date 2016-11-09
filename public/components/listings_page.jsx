import React, { Component } from 'react';
import ListingsList from '../containers/listings-list';
import GoogleMaps from './google_maps';



export default class ListingsPage extends Component {
  constructor(props) {
    super(props);
    console.log('constructor running');
    this.state = { 
      listings: [],
      currentCityLat: 0,
      currentCityLong: 0,

     };
    this.updateListings = this.updateListings.bind(this);
  }

  updateListings(listingData) {
    this.setState({
      listings: listingData.listings,
      currentCityLat: listingData.lat,
      currentCityLong: listingData.lon
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
          <ListingsList updateListings={this.updateListings} />
        </div>
        <div className='listing_map'>
          <GoogleMaps />
        </div>
      
      </div>
    );
  }
}
