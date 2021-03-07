const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    maxConcurrentQueries: dbConfig.MAX_CONCURRENT_QUERIES,
    ssl: dbConfig.SSL,
    pool: {
      maxConnections: dbConfig.pool.max,
      maxIdleTime: dbConfig.pool.idle
    },
    language: dbConfig.language,
    dialect: dbConfig.dialect,
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.task = require("./task.model.js")(sequelize, Sequelize);

// force: true will drop the table if it already exists
// db.sequelize.sync({force: false}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

module.exports = db;
