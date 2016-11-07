const dbHelpers = require('./dbHelpers');

module.exports.getListings = (req, res) => {
  dbHelpers.getListings()
  .then((listings) => {
    res.json(listings);
  })
  .catch((err) => {
    res.statusCode(400).send('Error: ', err);
  });
};
