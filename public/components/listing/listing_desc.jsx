import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import request from 'axios';

import ListingScores from './listing_scores';

const ListingDesc = ({ activeListing, activeUser }) => {
  const applyToListing = () => {
    request.post('/api/applyToListing', {
      renterId: activeUser.id,
      listingId: activeListing.id
    })
    .then((renterListing) => {
      console.log('Successful in sending renter listing', renterListing);
    })
    .catch((err) => {
      console.log('Failed to post renterApplication to use', err);
    });
  };

  return (
    <div className="listingInfo">
      <h2>{activeListing.street}</h2>
      <h3>{activeListing.city.name}, {activeListing.city.state} {activeListing.zip}</h3><br />
      <div>
        <div className="details">
          <h4> Unit: {activeListing.unit} </h4>
          <h4> Beds: {activeListing.beds}</h4>
          <h4> Baths: {activeListing.baths}</h4>
        </div>
        <div className="details">
          <h4>Rent: ${activeListing.rent}</h4>
          <h4>SqFoot: {activeListing.sqFoot}</h4>
          <h4>Available: {activeListing.availableDate.slice(0, 10)}</h4>
        </div>
        <div className="listingScores">
          <ListingScores activeListing={activeListing} />
        </div>
        <Button
            className="favorite"
            bsSize="small"
            bsStyle="info"
            onClick={() => {
              this.addToFavorites(listing.id);
            }}
        >
          <Glyphicon glyph="heart-empty" />
        </Button>

        {(activeUser.userType !== 1) &&
          <button onClick={applyToListing}> Apply </button>
        }
      </div>
    </div>
  );
};

export default ListingDesc;
