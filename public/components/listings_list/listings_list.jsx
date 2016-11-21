import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import request from 'axios';

import OptionBox from './option_box';
import ListingsListItem from './listings_list_item';

class ListingsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glyphiconStar: 'star-empty',
      glyphiconheart: 'heart',
      test: false
    };

    this.goToListing = this.goToListing.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
  }

  goToListing(listing) {
    browserHistory.push(`/content/listing/${listing.id}`);
  }

  addToFavorites(listing) {
    request.post('/api/addfavorite', {
      listing
    }).catch((err) => {
      console.log('Error favoriting listing', err);
    });
  }

  renderListings() {
    if (!this.props.listings || !this.props.listings.length) {
      return <div>No listings in this local..</div>;
    }

    return this.props.listings.map((listing) => {
      return (
        <div className="listing">
          <ListingsListItem
            key={listing.id}
            listing={listing}
            city={listing.city.name}
            state={listing.city.state}
            selectListing={this.props.selectListing}
            goToListing={this.goToListing}
          />
          Compare:
          <Button
            className="compare"
            bsSize="small"
            bsStyle="info"
            onClick={() => {
              this.props.updateCompareListings(listing);
            }}
          >
            <Glyphicon glyph={this.state.glyphiconStar} />
          </Button>
          <Button
            className="favorite"
            bsSize="small"
            bsStyle="info"
            onClick={() => {
              this.addToFavorites(listing);
            }}
          >
            <Glyphicon glyph="heart-empty" />
          </Button>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <OptionBox
          bedFilterHeader={this.props.bedFilterHeader}
          bathFilterHeader={this.props.bathFilterHeader}
          minRentFilterHeader={this.props.minRentFilterHeader}
          maxRentFilterHeader={(this.props.maxRentFilterHeader === '$100000') ? '' : this.props.maxRentFilterHeader}
          updateBedFilter={this.props.updateBedFilter}
          updateBathFilter={this.props.updateBathFilter}
          updateMinRentFilter={this.props.updateMinRentFilter}
          updateMaxRentFilter={this.props.updateMaxRentFilter}
          updateSorter={this.props.updateSorter}
        />
        {this.renderListings()}
      </div>
    );
  }
}

export default ListingsList;
