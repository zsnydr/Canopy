import React, { Component } from 'react';
import { connect } from 'react-redux';

import OptionBox from '../components/option_box';
import selectListing from '../actions/select_listing'


class ListingsList extends Component {
  constructor (props) {
    super(props);
  }


  componentDidUpdate() {
    this.props.updateListings(this.props.listings);
  }

  updateCurrentListing(listing) {
    console.log('listing clicked', listing);

    // selectListing(listing);
  }

  renderListing(listing) {
    return (
      <li onClick={updateCurrentListing(listing)} key={listing.id}>
        {listing.street}
      </li>
    );
  }

  render() {

    return (
      <div className='rentList'>
        <OptionBox submitOption={() => { console.log('Submited'); }} />
        <ul>
          {this.props.listings.map(this.renderListing)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ listings }) {
  return {
    listings
  };
}

export default connect(mapStateToProps)(ListingsList);
