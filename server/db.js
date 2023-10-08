const mariadb = require('mariadb');
const keys = require('./keys');
const pool = mariadb.createPool(keys);

async function executeQuery(query, params = []) {
  let conn;
  try {
    conn = await pool.getConnection();
    return await conn.query(query, params);
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.release();
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

module.exports = {
  getAllValues,
  insertValue,
};
