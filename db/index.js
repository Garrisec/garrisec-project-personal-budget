const pg = require('pg');
const { Pool } = pg;
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER, 
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const query = (text, params, callbacks) => {
    return pool.query(text, params, callbacks);
};

/*
pool.query('SELECT * FROM envelopes WHERE id = $1', [1], (error, results) => {
    console.log('results: ', results.rows);
    console.log(results)
});*/

module.exports = { pool, query }