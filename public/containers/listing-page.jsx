import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListingDetail from '../components/listing_details';

class ListingPage extends Component {

  render() {
    return (
      <div>
        Current listing
        // google map component
        <ListingDetail activeListing={this.props.activeListing} />
        // listing details component which will render listing description
        // component and listing pics component
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeListing: state.activeListing
  };
}

export default connect(mapStateToProps)(ListingPage);
