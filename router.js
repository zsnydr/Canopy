const helpers = require('./routeHelpers');

module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send('hello');
  });

//   app.get('/listings', helpers.getListings);
// };

  app.get('/listings/:city', function(req, resp){
    console.log(req.params.city)
    const newListing = [
      { apartment: 'quare' },
      { apartment: 'awthorn' },
      { apartment: 'EMA' }
    ];
    resp.send(200, newListing);
  })
};