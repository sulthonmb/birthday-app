import pool from './database';

pool.on('connect', () => {
  console.log('connected to the db');
});

require('make-runnable');