import Sequelize from 'sequelize';

import db from './dbConnect';

const Listing = db.define('listing', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  beds: Sequelize.INTEGER,
  baths: Sequelize.DECIMAL(10, 1),
  street: Sequelize.TEXT,
  city: Sequelize.TEXT,
  state: Sequelize.CHAR(2),
  zip: Sequelize.INTEGER,
  unitNumber: Sequelize.INTEGER,
  rent: Sequelize.INTEGER,
  sqFoot: Sequelize.INTEGER,
  dogs: Sequelize.BOOLEAN,
  cats: Sequelize.BOOLEAN,
  term: Sequelize.INTEGER,
  availableDate: Sequelize.DATEONLY,
  images: Sequelize.TEXT
});

const Host = db.define('host', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numOfListings: {
    type: Sequelize.INTEGER,
    default: 0
  },
  numOfratings: {
    type: Sequelize.INTEGER,
    default: 0
  },
  avgRating: {
    type: Sequelize.DECIMAL(10, 1),
    default: 0
  },
  hName: Sequelize.TEXT,
  hEmail: Sequelize.TEXT,
  hPhoneNumber: Sequelize.INTEGER
});

const Renter = db.define('renter', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  renterName: Sequelize.TEXT,
  email: Sequelize.TEXT,
  phoneNumber: Sequelize.INTEGER,
  password: Sequelize.TEXT,
  numApplied: {
    type: Sequelize.INTEGER,
    default: 0
  }
});

const Renter_Listing = db.define('renters_listing', {
  status: Sequelize.TEXT
});

Host.hasMany(Listing, { foreignKey: 'host_id' });

Renter.belongsToMany(Listing, { through: 'renters_listings' });
Listing.belongsToMany(Renter, { through: 'renters_listings' });

db.sync({
  force: true,
}).then(() => {
  console.log('Tables created');
}).catch((err) => {
  console.log('Failed to create tables...', err);
});

module.exports = {
  Listing: Listing,
  Host: Host,
  Renter: Renter,
  Renter_Listing: Renter_Listing
};
