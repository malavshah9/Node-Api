import { Sequelize, Model, DataTypes } from 'sequelize';
import dbConfig from '../../config/config.js';
const sequlize = new Sequelize(
    dbConfig.development.db,
    dbConfig.development.user,
    dbConfig.development.password,
    {
        host: dbConfig.development.url,
        dialect: dbConfig.development.options.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.development.options.pool.max,
            min: dbConfig.development.options.pool.min,
            acquire: dbConfig.development.options.pool.acquire,
            idle: dbConfig.development.options.pool.idle
        }
    }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequlize;

db.bookings = require('./users.js')(sequlize, Sequelize, DataTypes);

export default db;
