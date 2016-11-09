import React, { Component } from 'react';
import { connect } from 'react-redux';

import OptionBox from '../components/option_box';


class ListingsList extends Component {
  constructor (props) {
    super(props)
  }

  renderListing(listing) {
    return (
      <li key={listing.id}>
        {listing.street}
      </li>
    );
  }

  componentDidUpdate() {
    this.props.updateListings(this.props.listings);
  }
 

  render() {

    return (
      <div className='rentList'>
        <OptionBox submitOption={() => { console.log('Submited'); }} />
        <ul>
          <div onClick={console.log('clicked')}>
          {this.props.listings.map(this.renderListing)}
          </div>
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
