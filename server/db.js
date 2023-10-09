const {createPool} = require('mysql2/promise');
const credentials = require('./credentials');
console.log(credentials);
const pool = createPool(credentials);

async function executeQuery(query, params = []) {
  try {
    return await pool.query(query, params);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllValues() {
  const query = 'SELECT * FROM values';
  return executeQuery(query);
}

async function insertValue(value) {
  const query = 'INSERT INTO values (number) VALUES (?)';
  return executeQuery(query, [value]);
}

async function ping() {
  return executeQuery(`SELECT NOW() as now`);
}

module.exports = {
  getAllValues,
  insertValue,
  ping
};
