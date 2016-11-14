import React from 'react';
import ListingDesc from './listing_desc';
import ListingPics from './listing_pics';

const ListingDetail = (props) => {
  return (
    <div>
      <ListingDesc activeListing={props.activeListing} activeCity={props.activeCity} />
      {//listingimages contain image property that has the image source stored in ref
      }
      <ListingPics images={props.activeListing.images} />
    </div>
  );
};

export default ListingDetail;
