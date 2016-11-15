import React from 'react';

import ListingDesc from './listing_desc';
import ListingPics from './listing_pics';

const ListingDetail = ({ activeListing, activeCity }) => {
  return (
    <div>
      <ListingDesc activeListing={activeListing} activeCity={activeCity} />
      <ListingPics images={activeListing.images} />
    </div>
  );
};

export default ListingDetail;
