const Sequelize = require('sequelize');
// open database connection
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

// define models
const City = db.define('city', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  state: Sequelize.CHAR(2),
  lat: Sequelize.DECIMAL(10, 7),
  lon: Sequelize.DECIMAL(10, 7)
});

const Listing = db.define('listing', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  beds: Sequelize.INTEGER,
  baths: Sequelize.DECIMAL(10, 1),
  street: Sequelize.TEXT,
  zip: Sequelize.INTEGER,
  unitNumber: Sequelize.INTEGER,
  rent: Sequelize.INTEGER,
  sqFoot: Sequelize.INTEGER,
  dogs: Sequelize.BOOLEAN,
  cats: Sequelize.BOOLEAN,
  term: Sequelize.INTEGER,
  smoking: Sequelize.BOOLEAN,
  parking: Sequelize.TEXT,
  laundry: Sequelize.TEXT,
  availableDate: Sequelize.DATEONLY,
  lat: Sequelize.DECIMAL(10, 7),
  lon: Sequelize.DECIMAL(10, 7)
});

// const Host = db.define('host', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   numListings: {
//     type: Sequelize.INTEGER,
//     default: 0
//   },
//   numRatings: {
//     type: Sequelize.INTEGER,
//     default: 0
//   },
//   avgRating: {
//     type: Sequelize.DECIMAL(10, 1),
//     default: 0
//   },
//   name: Sequelize.TEXT,
//   email: Sequelize.TEXT,
//   phone: Sequelize.BIGINT,
//   password: Sequelize.TEXT
// });

// const Renter = db.define('renter', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   name: Sequelize.TEXT,
//   email: Sequelize.TEXT,
//   phone: Sequelize.INTEGER,
//   password: Sequelize.TEXT,
//   numApplied: {
//     type: Sequelize.INTEGER,
//     default: 0
//   }
// });

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  email: Sequelize.TEXT,
  password: Sequelize.TEXT,
  phone: Sequelize.INTEGER,
  userType: Sequelize.TEXT, // renter or host
  numListings: Sequelize.INTEGER, // null for renter
  numRatings: Sequelize.INTEGER, // null for renter
  avgRating: Sequelize.DECIMAL(10, 1), // null for renter
  numApplied: Sequelize.INTEGER // null for host
  // fk application id
  // fk verification id
});

const RenterListing = db.define('renterlisting', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: Sequelize.TEXT
});

const Image = db.define('image', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ref: Sequelize.TEXT
});

const Rating = db.define('rating', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  stars: Sequelize.INTEGER
});

const Verification = db.define('verification', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  background: Sequelize.TEXT,
  credit: Sequelize.TEXT
});

const Application = db.define('application', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  address: Sequelize.TEXT,
  numAdultOccupants: {
    type: Sequelize.INTEGER,
    default: 1
  },
  numChildOccupants: {
    type: Sequelize.INTEGER,
    default: 0
  },
  pets: Sequelize.TEXT,
  currentEmployer: Sequelize.TEXT,
  position: Sequelize.TEXT,
  duration: Sequelize.TEXT,
  annualIncome: Sequelize.INTEGER,
  supervisorName: Sequelize.TEXT,
  supervisorPhone: Sequelize.INTEGER,
  eSign: Sequelize.TEXT
  // 3 foreign keys for rental history
});

const RentalHistory = db.define('rentalhistory', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  address: Sequelize.TEXT,
  landlordName: Sequelize.TEXT,
  landlordPhone: Sequelize.INTEGER,
  rentPayment: Sequelize.INTEGER,
  duration: Sequelize.INTEGER,
  reasonLeft: Sequelize.TEXT
});

// define model relationships
// Relationships for listings to detailed info
Listing.belongsTo(City, { foreignKey: 'city_id' });
City.hasMany(Listing, { foreignKey: 'city_id' });
Image.belongsTo(Listing, { foreignKey: 'listing_id' });
Listing.hasMany(Image, { foreignKey: 'listing_id' });

/* Relationships for listings to users
   1. listing to host
   2. listing to renters
*/
Listing.belongsTo(User, { foreignKey: 'host_id' });
User.hasMany(Listing, { foreignKey: 'host_id' });

RenterListing.belongsTo(Listing, { foreignKey: 'listing_id' });
Listing.hasMany(RenterListing, { foreignKey: 'listing_id' });
RenterListing.belongsTo(User, { foreignKey: 'renter_id' });
User.hasMany(RenterListing, { foreignKey: 'renter_id' });

/* Relationships for renter details
   1. renter to verification
   2. renter to application
      - application to rental history
*/
User.belongsTo(Verification, { foreignKey: 'verification_id' });

User.belongsTo(Application, { foreignKey: 'Application_id' });
RentalHistory.belongsTo(Application, { foreignKey: 'application_id' });
Application.hasMany(RentalHistory, { foreignKey: 'application_id' });

// Rating.belongsTo(Renter, { foreignKey: 'renter_id' });
// Renter.hasMany(Rating, { foreignKey: 'renter_id' });

// Rating.belongsTo(Host, { foreignKey: 'host_id' });
// Host.hasMany(Rating, { foreignKey: 'host_id' });

// Renter.hasOne(Verification, { foreignKey: 'renter_id' });
// Renter.hasOne(Verification, { foreignKey: 'renter_id' });

// build tables
db.sync({ force: false })
.then(() => {
  console.log('Tables created');
}).catch((err) => {
  console.log('Failed to create tables...', err);
});

module.exports = {
  User,
  City,
  Listing,
  // Host,
  // Renter,
  RenterListing,
  Verification,
  Application,
  RentalHistory,
  Image,
  Rating
};
