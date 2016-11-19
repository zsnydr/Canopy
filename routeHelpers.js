// const fs = require('file-system');
// const path = require('path');
const geoCoder = require('./geoCoder');

const dbHelpers = require('./dbHelpers');
const { encodeJwt } = require('./authHelpers');


module.exports = {

  signUp: (req, res) => {
    dbHelpers.signUp(req.body)
    .then((user) => {
      res.json(encodeJwt(user));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  signIn: (req, res) => {
    dbHelpers.signIn(req.body)
    .then((user) => {
      res.json(encodeJwt(user));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  getCurrentPosition: (req, res) => {
    geoCoder.reverse({ lat: req.query.lat, lon: req.query.lon }, (err, data) => {
      res.send(`${data[0].city}, ${data[0].administrativeLevels.level1short}`);
    });
  },

  getCity: (req, res) => {
    dbHelpers.getCity(req.params.city)
    .then((city) => {
      res.json(city);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  getListings: (req, res) => {
    dbHelpers.getListings(req.params.cityId)
    .then((listings) => {
      console.log('listings from route helpers', listings);
      res.json(listings);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  getListing: (req, res) => {
    dbHelpers.getListing(req.params.listingId)
    .then((listing) => {
      res.json(listing);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  postListing: (req, res) => {
    dbHelpers.postListing(req.body)
    .then((listing) => {
      console.log('Posted listing: ', listing);
      res.json(listing);
    })
    .catch((err) => {
      console.log('Failed to post listing: ', err);
      res.json(err);
    });
  },

  getUserRenterListings: (req, res) => {
    dbHelpers.getUserRenterListings(req.params.userId)
    .then((userRenterListings) => {
      res.json(userRenterListings);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  getUserHostListings: (req, res) => {
    dbHelpers.getUserHostListings(req.params.userId)
    .then((userHostListings) => {
      res.json(userHostListings);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  postImages: (req, res) => {
    dbHelpers.postImages(req.body)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log('Failed to post images: ', err);
      res.json(err);
    });
  },
  // Expects all information for application schema in an JSON
  postApplication: (req, res) => {
    dbHelpers.postApplication(req.body)
    .then((application) => {
      res.json(application);
    })
    .catch((err) => {
      console.log('Failed to post application: ', err);
      res.json(err);
    });
  },

  // Takes renter_Id and returns application
  getApplication: (req, res) => {
    const renterId = parseInt(req.params.renterId);
    dbHelpers.getApplication(renterId)
    .then((application) => {
      res.json(application);
    })
    .catch((err) => {
      console.log('Failed to get application: ', err);
      res.json(err);
    });
  },

  // Expects all information for rental history schema in an JSON
  postRentalHistory: (req, res) => {
    dbHelpers.postRentalHistory(req.body)
    .then((rentalHistory) => {
      res.json(rentalHistory);
    })
    .catch((err) => {
      console.log('Failed to post rentalHistory: ', err);
      res.json(err);
    });
  },

  // Takes application_id and returns rental histories of it
  getRentalHistory: (req, res) => {
    const applicationId = parseInt(req.params.applicationId);
    dbHelpers.getRentalHistory(applicationId)
    .then((rentalHistories) => {
      res.json(rentalHistories);
    })
    .catch((err) => {
      console.log('Failed to get rental histories: ', err);
      res.json(err);
    });
  },

  // Takes renter_id and listing_id and returns renterListing
  applyToListing: (req, res) => {
    dbHelpers.applyToListing(res.body)
    .then((renterListing) => {
      res.json(renterListing);
    })
    .catch((err) => {
      console.log('Failed to post renterListing');
      res.json(err);
    });
  }
};
