import request from 'axios';
import { browserHistory } from 'react-router';
import selectListing from './select_listing';

export default function postImages(imageData) {
  return request.post('/api/images', imageData)
  .then(() => {
    return request.get(`/api/listing/${imageData.listing_id}`)
    .then((listing) => {
      console.log('SELECT LISTING IN POST IMG ACTION ', listing)
      selectListing(listing.data);
      browserHistory.push(`/content/listing/${imageData.listing_id}`);
    });
  });
}
