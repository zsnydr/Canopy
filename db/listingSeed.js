const Sequelize = require('sequelize');
const Listing = require('./schema').Listing;
const User = require('./schema').User;
const City = require('./schema').City;
const Image = require('./schema').Image;
const RenterListing = require('./schema').RenterListing;

const db = new Sequelize('canopy', 'root', 'monkey', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

db
  .authenticate()
  .then(() => {
    console.log('Connection established...');
  })
  .catch((err) => {
    console.log('Unable to connect...', err);
  });

// mock hosts
const cityData = [
  {
    name: 'SAN FRANCISCO',
    state: 'CA',
    lat: 37.7749295,
    lon: -122.4194155
  }, {
    name: 'CHICAGO',
    state: 'IL',
    lat: 41.8781136,
    lon: -87.6297982
  }];

const hostData = [
  {
    name: 'Sean Enright',
    email: 'seanenright@property.com',
    phone: 5413856987,
    userType: 0,
    password: '$2a$12$aZpDFAPJh9Ql04O40fJoyODmcsn8qq06KFnhK3ZTBsYRkAvF2d9jW'
  }, {
    name: 'Victor Choi',
    email: 'victorchoi@nest.com',
    phone: 5413762384,
    userType: 1,
    password: '$2a$12$aZpDFAPJh9Ql04O40fJoyODmcsn8qq06KFnhK3ZTBsYRkAvF2d9jW'
  }, {
    name: 'Zack Snyder',
    email: 'zacksnyder@mgmt.com',
    phone: 5035869374,
    userType: 2,
    password: '$2a$12$aZpDFAPJh9Ql04O40fJoyODmcsn8qq06KFnhK3ZTBsYRkAvF2d9jW'
  }];

// mock listings
const listingData = [
  {
    beds: 3,
    baths: 1.5,
    street: '1890 Page St',
    city_id: 1,
    zip: 94117,
    unitNumber: '#101',
    rent: 1200,
    sqFoot: 60,
    dogs: false,
    cats: false,
    term: 6,
    smoking: true,
    parking: '2',
    laundry: 'In Unit',
    availableDate: '2016-11-07',
    host_id: 1,
    lat: 37.77056,
    lon: -122.4541,
    walkScore: `{"result":{"xmlns":"http://walkscore.com/2008/results","status":"1","walkscore":"97","description":"Walker's Paradise","updated":"2016-09-14 14:24:41.797460","logo_url":"https://cdn.walk.sc/images/api-logo.png","more_info_icon":"https://cdn.walk.sc/images/api-more-info.gif","more_info_link":"https://www.redfin.com/how-walk-score-works","ws_link":"https://www.walkscore.com/score/18-10th-street.and.San-Francisco.and.CA.and.94103/lat=37.7756087/lng=-122.4169099/?utm_source=138.68.11.13:3000&utm_medium=ws_api&utm_campaign=ws_api","help_link":"https://www.redfin.com/how-walk-score-works","snapped_lat":"37.7760","snapped_lon":"-122.4165"}}`
  }, {
    beds: 2,
    baths: 1,
    street: '800 Bush St',
    city_id: 1,
    zip: 94108,
    unitNumber: "424G",
    rent: 1650,
    sqFoot: 700,
    dogs: true,
    cats: false,
    term: 12,
    smoking: true,
    parking: '2',
    laundry: 'In Unit',
    availableDate: '2016-11-07',
    host_id: 1,
    lat: 37.78413,
    lon: -122.39574,
    walkScore: `{"result":{"xmlns":"http://walkscore.com/2008/results","status":"1","walkscore":"97","description":"Walker's Paradise","updated":"2016-09-14 14:24:41.797460","logo_url":"https://cdn.walk.sc/images/api-logo.png","more_info_icon":"https://cdn.walk.sc/images/api-more-info.gif","more_info_link":"https://www.redfin.com/how-walk-score-works","ws_link":"https://www.walkscore.com/score/18-10th-street.and.San-Francisco.and.CA.and.94103/lat=37.7756087/lng=-122.4169099/?utm_source=138.68.11.13:3000&utm_medium=ws_api&utm_campaign=ws_api","help_link":"https://www.redfin.com/how-walk-score-works","snapped_lat":"37.7760","snapped_lon":"-122.4165"}}`
  }, {
    beds: 4,
    baths: 2.5,
    street: '3022 W. Fletcher',
    city_id: 2,
    zip: 94117,
    unitNumber: 56,
    rent: 1650,
    sqFoot: 450,
    dogs: true,
    cats: true,
    term: 1,
    smoking: true,
    parking: '2',
    laundry: 'In Unit',
    availableDate: '2016-11-07',
    host_id: 3,
    lat: 41.9387,
    lon: -87.7059,
    walkScore: `{"result":{"xmlns":"http://walkscore.com/2008/results","status":"1","walkscore":"97","description":"Walker's Paradise","updated":"2016-09-14 14:24:41.797460","logo_url":"https://cdn.walk.sc/images/api-logo.png","more_info_icon":"https://cdn.walk.sc/images/api-more-info.gif","more_info_link":"https://www.redfin.com/how-walk-score-works","ws_link":"https://www.walkscore.com/score/18-10th-street.and.San-Francisco.and.CA.and.94103/lat=37.7756087/lng=-122.4169099/?utm_source=138.68.11.13:3000&utm_medium=ws_api&utm_campaign=ws_api","help_link":"https://www.redfin.com/how-walk-score-works","snapped_lat":"37.7760","snapped_lon":"-122.4165"}}`
  }, {
    beds: 1,
    baths: 1,
    street: '911 W. Madison',
    city_id: 2,
    zip: 94117,
    unitNumber: 3,
    rent: 2200,
    sqFoot: 100,
    dogs: false,
    cats: true,
    term: 12,
    smoking: true,
    parking: '2',
    laundry: 'In Unit',
    availableDate: '2016-11-07',
    host_id: 3,
    lat: 41.8817,
    lon: -87.6528,
    walkScore: `{"result":{"xmlns":"http://walkscore.com/2008/results","status":"1","walkscore":"97","description":"Walker's Paradise","updated":"2016-09-14 14:24:41.797460","logo_url":"https://cdn.walk.sc/images/api-logo.png","more_info_icon":"https://cdn.walk.sc/images/api-more-info.gif","more_info_link":"https://www.redfin.com/how-walk-score-works","ws_link":"https://www.walkscore.com/score/18-10th-street.and.San-Francisco.and.CA.and.94103/lat=37.7756087/lng=-122.4169099/?utm_source=138.68.11.13:3000&utm_medium=ws_api&utm_campaign=ws_api","help_link":"https://www.redfin.com/how-walk-score-works","snapped_lat":"37.7760","snapped_lon":"-122.4165"}}`
  }];
const imageData = [
  { listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815237/tigar_emdap4.jpg'
  }, { listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815229/kawhi_wm1vki.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815224/fastRat_o8pmqh.jpg'
  }, { listing_id: 4,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815234/panTuna_fep0v6.jpg'
  },{ listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815237/tigar_emdap4.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815229/kawhi_wm1vki.jpg'
  }, { listing_id: 4,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815224/fastRat_o8pmqh.jpg'
  }, { listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815234/panTuna_fep0v6.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815237/tigar_emdap4.jpg'
  }, { listing_id: 4,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815229/kawhi_wm1vki.jpg'
  }, { listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815224/fastRat_o8pmqh.jpg'
  }, { listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815234/panTuna_fep0v6.jpg'
  }];
const renterListingData = [
  { hostSeen: false, hasApplied: false, renter_id: 3, listing_id: 1 },
  { hostSeen: true, hasApplied: true, renter_id: 3, listing_id: 2 },
  { hostSeen: false, hasApplied: false, renter_id: 2, listing_id: 3 },
  { hostSeen: false, hasApplied: true, renter_id: 2, listing_id: 4 }
];
/* c for Create
   p for Promise
   a for Array
*/
const cCitypa = (cityArray) => {
  return cityArray.map(city => City.create(city));
};
const cHostpa = (hostArray) => {
  return hostArray.map(host => User.create(host));
};
const cListingpa = (listingArray) => {
  return listingArray.map(listing => Listing.create(listing));
};
const cImagepa = (imageArray) => {
  return imageArray.map(image => Image.create(image));
};
const cRenterListingpa = (renterListingArray) => {
  return renterListingArray.map(renterListing => RenterListing.create(renterListing));
};
// Actually calling all, with promise
Promise.all([
  ...cCitypa(cityData),
  ...cHostpa(hostData),
  ...cListingpa(listingData),
  ...cImagepa(imageData),
  ...cRenterListingpa(renterListingData)
])
.then((all) => {
  console.log('Created image for ', all.length);
})
.catch((err) => {
  console.log('Error creating listing: ', err);
});
