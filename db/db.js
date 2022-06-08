require('dotenv').config();
const { Client } = require('pg');

const pool = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
