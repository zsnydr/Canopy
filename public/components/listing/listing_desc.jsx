import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import request from 'axios';

import ListingScores from './listing_scores';

// activeListing, activeUser
class ListingDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: 'heart-empty'
    };
    this.applyToListing = this.applyToListing.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
  }

  applyToListing() {
    request.post('/api/applyToListing', {
      renterId: this.props.activeUser.id,
      listingId: this.props.activeListing.id
    })
    .then((renterListing) => {
      console.log('Successful in sending renter listing', renterListing);
    })
    .catch((err) => {
      console.log('Failed to post renterApplication to use', err);
    });
  };

  addToFavorites(listing_id) {
    if (this.props.activeUser.length === 0) {
      return alert('must be logged in to add favorite');
    }

    return request.post('/api/addfavorite', {
      listing_id,
      renter_id: this.props.activeUser.id
    })
    .then(() => {
      this.setState({ heart: 'heart' });
      console.log('favorited listing');
    })
    .catch((err) => {
      console.log('Error favoriting listing', err);
    });
  }

  render() {
    return (
      <div className="listingInfo">
        <h2>{this.props.activeListing.street}</h2>
        <h3>{this.props.activeListing.city.name}, {this.props.activeListing.city.state} {this.props.activeListing.zip}</h3><br />
        <div>
          <div className="details">
            <h4> Unit: {this.props.activeListing.unit} </h4>
            <h4> Beds: {this.props.activeListing.beds}</h4>
            <h4> Baths: {this.props.activeListing.baths}</h4>
          </div>
          <div className="details">
            <h4>Rent: ${this.props.activeListing.rent}</h4>
            <h4>SqFoot: {this.props.activeListing.sqFoot}</h4>
            <h4>Available: {this.props.activeListing.availableDate.slice(0, 10)}</h4>
          </div>
          <div className="listingScores">
            <ListingScores activeListing={this.props.activeListing} />
          </div>
          <Button
            className="favorite"
            bsSize="small"
            bsStyle="info"
            onClick={() => {
              this.addToFavorites(this.props.activeListing.id);
            }}
          >
            <Glyphicon glyph={this.state.heart} />
          </Button>

          {(this.props.activeUser && this.props.activeUser.userType !== 1) &&
            <button onClick={this.applyToListing}> Apply </button>
          }
        </div>
      </div>
    );
  }
};

export default ListingDesc;
