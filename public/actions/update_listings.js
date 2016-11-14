import request from 'axios';

export default function updateListings(cityId) {
  const listings = request.get(`/api/listings/${cityId}`);

  return {
    type: 'UPDATE_LISTINGS',
    payload: listings
  };
}
