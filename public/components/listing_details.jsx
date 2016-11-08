import React from 'react';
import ListingDesc from './listing_desc';
import ListingPics from './listing_pics';

const ListingDetail = (props) => {
  return (
    <div>
      <ListingDesc activeListing={props.activeListing} />
      <ListingPics activeListing={props.activeListing} />
    </div>
  );
};

export default ListingDetail;
