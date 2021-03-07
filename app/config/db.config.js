
module.exports = {
  DB: process.env.DB_DB_NAME,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST,
  PORT:process.env.DB_PORT,
  MAX_CONCURRENT_QUERIES:process.env.DB_MAX_CONCURRENT_QUERIES,
  SSL:process.env.DB_SSL,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: process.env.DB_POOL_MAX,
    min: process.env.DB_POOL_MIN,
    acquire: process.env.DB_POOL_ACQUIRE,
    idle: process.env.DB_POOL_IDLE
  },
  language:process.env.DB_LANGUAGE
};
