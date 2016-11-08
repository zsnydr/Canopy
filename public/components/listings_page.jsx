import React, { Component } from 'react';
import ListingsList from '../containers/listings-list';


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
        <div>Map will go here</div>
        <ListingsList updateListings={this.updateListings} />
      </div>
    );
  }
}
