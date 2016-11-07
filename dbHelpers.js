const Listing = require('./db/schema').Listing;
// const Host = require('./db/schema').Host;
// const Renter = require('./db/schema').Renter;
// const RenterListing = require('./db/schema').RenterListing;

module.exports = {
  getListings: (req, res) => {
    return Listing.findAll({})
    .then((listings) => {
      console.log('allListings: ', listings);
    })
    .catch((err) => {
      res.statusCode(400).send('Error: ', err);
    });
  }
};
