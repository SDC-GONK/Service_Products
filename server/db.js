require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// changed env files to align with remote server

pool.connect()
  .then(() => console.log('successfully connected to database'))
  .catch((err) => console.log('error connecting to db', err));

module.exports = pool;
