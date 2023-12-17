const { Pool } = require('pg');
const credentials = require('./credentials');
console.log(credentials);
const pool = new Pool(credentials);

async function executeQuery(query, params = []) {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function getAllValues() {
  const query = 'SELECT * FROM `values`;';
  const response = await executeQuery(query);
  return parseMysql2Response(response);
}

async function insertValue(value) {
  const query = 'INSERT INTO `values` (value) VALUES (?)';
  return executeQuery(query, [value]);
}

async function ping() {
  return executeQuery(`SELECT NOW() as now`);
}

module.exports = {
  getAllValues, insertValue, ping
};
