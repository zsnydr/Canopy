const helpers = require('./routeHelpers');

export default (app) => {
  app.get('/', (req, res) => {
    res.statusCode(201).end();
  });

  app.get('/listings', helpers.getListings);
};
