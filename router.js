const helpers = require('./routeHelpers');

module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send('hello');
  });

  app.get('/api/position', helpers.getCurrentPosition);

  app.get('/api/listings/:city', helpers.getListings);

  app.post('/api/listings', helpers.postListing);

  app.get('/api/listing/:listingId', helpers.getListing);

  app.post('/api/images', helpers.postImages);
};
