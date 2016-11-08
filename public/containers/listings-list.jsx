import React, { Component } from 'react';
import { connect } from 'react-redux';

import OptionBox from '../components/option_box';


class ListingsList extends Component {
  renderListing(listing) {
    return (
      <li key={listing.id}>
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
