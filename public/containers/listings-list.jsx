import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OptionBox from '../components/option_box';
import { selectListing } from '../actions/select_listing'


class ListingsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.props.updateListings(this.props.listings);
  }

  renderListing(listing) {
    return this.props.listings.map((listing) => {
      return (
        <li key={listing.id}>
          <div
            onClick={() => {
              this.props.selectListing(listing);
            }}
          >
            {listing.street}
          </div>
        </li>
      );
    });
  }

  render() {

    return (
      <div className='rentList'>
        <OptionBox submitOption={() => { console.log('Submited'); }} />
        <ul>
          {this.renderListing()}
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

function mapDispatchToProps(dispatch) {
  //Whenever SelectBook is called the result should be passed
  //to all of our reducers
  return bindActionCreators({ selectListing: selectListing }, dispatch);


}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsList);
