const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
);

sequelize.authenticate()
    .then(() => {
        console.log('connected..');
    })
    .catch(err => {
        console.log('Error' + err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require('./categoryModel.js')(sequelize, DataTypes);
db.dishes = require('./dishesModel.js')(sequelize, DataTypes);
db.admin = require('./adminModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!');
    });
 
// 1 to Many Relation

db.category.hasMany(db.dishes, {
    foreignKey: 'category_id'
    // as: 'category'
});

db.dishes.belongsTo(db.category, {
    foreignKey: 'category_id'
    // as: 'category'
});





module.exports = db;
