import React from 'react';

const ListingDesc = (props) => {
  return (
    <div>
      <h3>{props.street}</h3>
      <h4>`${props.city}, ${props.state} ${props.zip}`</h4><br />
      <div>
        Unit: {props.unit}
        Beds: {props.beds}
        Baths: {props.baths}
        Rent: {props.rent}
        SqFoot: {props.sqFoot}
        Available: {props.availableDate}
        <br />
        <button>Apply</button>
      </div>
    </div>
  );
};

export default ListingDesc;
