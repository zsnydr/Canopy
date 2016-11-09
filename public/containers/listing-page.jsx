import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListingDetail from '../components/listing_details';

class ListingPage extends Component {

  render() {
    return (
      <div>
        Google Map
        <ListingDetail activeListing={this.props.activeListing} />
      </div>
    );
  }
}

function mapStateToProps({ activeListing }) {
  return {
    activeListing
  };
}

export default connect(mapStateToProps)(ListingPage);
