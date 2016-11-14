import request from 'axios';

export default function addListing(listingData) {
  console.log("listingdata!!!", listingData);
  const payload = request.post('/api/listings', listingData);

  // return {
  //   type: 'LISTING_SELECTED',
  //   payload
  // };
}
