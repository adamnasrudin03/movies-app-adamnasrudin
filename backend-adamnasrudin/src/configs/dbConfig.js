const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
  HOST: DB_HOST,
  USER: DB_USERNAME,
  PASSWORD: DB_PASSWORD,
  DB: DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
