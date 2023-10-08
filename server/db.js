const { Pool } = require("pg");
const keys = require("./keys");

const pool = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pool.on("connect", () => {
  console.log("Connected to Postgres database");
});

const getAllValues = async () => {
  const { rows } = await pool.query("SELECT * FROM values");
  return rows;
};

const insertValue = async (value) => {
  await pool.query("INSERT INTO values(number) VALUES($1)", [value]);
};

module.exports = {
  getAllValues,
  insertValue,
};
