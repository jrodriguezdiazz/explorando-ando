const mysql = require('mysql2');
const keys = require('./keys');
const connection = mysql.createConnection(keys);

async function executeQuery(query, params = []) {
  let conn;
  try {
    return await connection.query(query, params);
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

module.exports = {
  getAllValues,
  insertValue,
};
