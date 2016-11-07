import request from 'axios';


export default function updateListings(city) {
  const listings = request.get('/listings/'+city);
  // .then((listings) => {
  //   return {
  //     type: 'UPDATE_LISTINGS',
  //     payload: listings
  //   };
  // }).catch((err) => {
  //   console.log('update listing error', err);
  // });
  return {
      type: 'UPDATE_LISTINGS',
      payload: listings.then((p) => {
        return p.data;
      })
  };
}
