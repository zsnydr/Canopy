const mysql = require('mysql');
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'monkey', 'root', '1', {
  host: 'localhost',
  // password: '1',
  dialect: 'mysql'
});

db
  .authenticate()
  .then((err) => {
    console.log('Connection established...');
  })
  .catch((err) => {
    console.log('Unable to connect...', err);
  });

module.exports = db;
