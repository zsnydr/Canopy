import React from 'react';
import ListingDesc from './listing_desc';
import ListingPics from './listing_pics';

const ListingDetail = (props) => {
  return (
    <div>
      <img className="curPic" src={__dirname+props.picture} />
    </div>
  );
};

export default ListingDetail;
