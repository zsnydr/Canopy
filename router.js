const helpers = require('./routeHelpers');

module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send('hello');
  });

  app.get('/api/position', helpers.getCurrentPosition);

  app.get('/api/cities/:city', helpers.getCity);

  app.get('/api/listings/:cityId', helpers.getListings);

  app.post('/api/listings', helpers.postListing);

  app.get('/api/listing/:listingId', helpers.getListing);

  app.post('/api/images', helpers.postImages);
};
