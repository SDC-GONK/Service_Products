require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});

pool.connect()
  .then(() => console.log('successfully connected to database'))
  .catch((err) => console.log('error connecting to db', err));

module.exports = pool;
