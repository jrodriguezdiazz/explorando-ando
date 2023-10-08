module.exports = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root_password',
  database: process.env.DB_DATABASE || 'mydb',
  port: process.env.DB_PORT || 3306,
  connectionLimit: 5,
};
