import { Sequelize, Model, DataTypes } from 'sequelize';
import dbConfig from '../../config/config.js';
import bcrypt from 'bcrypt';
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

db.users = require('./users.js')(sequlize, Sequelize, DataTypes);
db.bookings = require('./bookings.js')(sequlize, Sequelize, DataTypes);
db.cabs = require('./cabs.js')(sequlize, Sequelize, DataTypes);
db.users.prototype.validPassword = async (password, anotherPassword) => {
    return await bcrypt.compare(password, anotherPassword);
};
db.users.hasMany(db.bookings, {
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE'
});
db.bookings.belongsTo(db.users, {
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE'
});
db.bookings.belongsTo(db.cabs, {
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE'
});
export default db;
