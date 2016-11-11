import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListingForm from '../components/add_listing_form';

class AddListingPage extends Component {

  render() {
    return (
     <div>
        <ListingForm />
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(AddListingPage);
