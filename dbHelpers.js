const Listing = require('./db/schema').Listing;
const City = require('./db/schema').City;
const Image = require('./db/schema').Image;
const User = require('./db/schema').User;

const geoCoder = require('./geoCoder');
const bcrypt = require('bcrypt');
// const Host = require('./db/schema').Host;
// const Renter = require('./db/schema').Renter;
// const RenterListing = require('./db/schema').RenterListing;

module.exports = {
  // signUp: (userData) => {
  //   User.find({ where: { username: userData.username } })
  //   .then((user) => {
  //     if (user) {
  //       return 'User already exists';
  //     }
  //     bcrypt.genSalt(10, (err, salt) => {
  //       if (err) { return err; }
  //       bcrypt.has(userData.password, salt, null, (err, hash) => {
  //         if (err) { return err; }
  //         User.create({ username: userData.username, password: hash })
  //         .then((user) => {
  //           return user;
  //         })
  //       })
  //     })
  //     User.create({})
  //   })
  //   // make sure user doesn't alreay exist
  //   // encrypt password and create new user
  //   // send back to route helpers
  // },

  // signIn: (userData) => {
  //   User.find({ where: { username: userData.username } })
  //   .then((user) => {
  //     if (!user) {
  //       return 'User does not exist';
  //     }

  //   })
  //   .catch((err) => {
  //     return `Error signing up: ${err}`;
  //   });
  //   // find user
  //   // validate password
  //   // send back to roure helpers
  // },

  getCity: (city) => {
    return geoCoder.geocode(city)
    .then((res) => {
      return City.findOrCreate({
        where: {
          name: city.slice(0, -4).toUpperCase(),
          state: city.slice(-2).toUpperCase(),
          lat: res[0].latitude,
          lon: res[0].longitude
        }
      })
      .spread((cityData) => {
        return cityData;
      })
      .catch((err) => {
        return `Error getting listings: ${err}`;
      });
    });
  },

  getListings: (cityId) => {
    console.log('IN GET LISTINGS')
    return Listing.findAll({
      where: {
        city_id: cityId
      },
      include: [Image]
    })
    .then((listings) => {
      return listings;
    })
    .catch((err) => {
      return `Error getting listings: ${err}`;
    });
  },

  getListing: (listingId) => {
    return Listing.find({
      where: { id: listingId },
      include: [Image]
    })
    .then((listing) => {
      return listing;
    })
    .catch((err) => {
      return `Error getting listing: ${err}`;
    });
  },

  postListing: (listingInfo) => {
    return geoCoder.geocode(`${listingInfo.street} ${listingInfo.city}, ${listingInfo.state}`)
    .then((res) => {
      listingInfo.lat = res[0].latitude;
      listingInfo.lon = res[0].longitude;
      return Listing.create(listingInfo)
      .then((listing) => {
        return listing;
      })
      .catch((err) => {
        return `Error posting listing: ${err}`;
      });
    })
  },

  postImages: (imageData) => {
    return new Promise((resolve, reject) => {
      const { images, listing_id } = imageData;
      images.forEach((image) => {
        Image.create({
          listing_id,
          ref: image
        })
        .then((img) => {
          console.log('Created image: ', img);
        })
        .catch((err) => {
          console.log('Error creating image: ', err);
          reject(err);
        });
      });
      resolve();
    });
  }
};
