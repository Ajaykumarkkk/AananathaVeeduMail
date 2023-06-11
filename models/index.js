// 'use strict';

// var fs = require('fs');
// var path = require('path');
// var Sequelize = require('sequelize');
// var basename = path.basename(__filename);
var db = {};
// // console.log("asdfg", CONFIG.db_name);
// // console.log("asdfg", CONFIG.db_password);
// // console.log("asdfg", CONFIG.db_user);
// // console.log("asdfg",CONFIG.db_name);
// const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
//     host: CONFIG.db_host,
//     dialect: CONFIG.db_dialect,
//     // dialectOptions: { useUTC: false },
//     // timezone: "Europe/Warsaw",
//     port: CONFIG.db_port,
//     operatorsAliases: false,
//     logging: false,
//     define: {
//         timestamps: false
//     },
//     dialectOptions: {
//         useUTC: true
//     },
//     pool: {
//         max: Number(CONFIG.max_pool_conn),
//         min: Number(CONFIG.min_pool_conn),
//         idleTime: CONFIG.conn_idle_time
//     }
// }
// );

// fs
//     .readdirSync(__dirname)
//     .filter(file => {
//         return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//     })
//     .forEach(file => {
//         // var model = sequelize['import'](path.join(__dirname, file));
//         var model = require(path.join(__dirname, file))(sequelize, Sequelize);
//         db[model.name] = model;
//     });


// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

var Sequelize = require("sequelize");
require('../config/config');
const sequelize = new Sequelize(
    CONFIG.db_name,
    CONFIG.db_user,
    CONFIG.db_password,
    {
        host: CONFIG.db_host,
        dialect: CONFIG.db_dialect,
        port: CONFIG.db_port,
        logging: false,
        define: {
            timestamps: false,
            underscored: true,
        },
        pool: {
            max: +CONFIG.max_pool_conn,
            min: +CONFIG.min_pool_conn,
            idleTime: CONFIG.conn_idle_time,
        },
        dialectOptions: {
            useUTC: true,
        },
    }
);
module.exports = sequelize;
//authenticate our credentials with sequelize
sequelize.authenticate()
    .then(() => {
        console.log("Connected to SQL database:", CONFIG.db_name);
    })
    .catch((err) => {
        console.error(
            "Unable to connect to Postgres database:",
            'postgres',
            err.message
        );
        sequelize.close()
    });
// module.exports = sequelize;


db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;