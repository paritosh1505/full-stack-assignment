const sequelize = require('sequelize');
const database = require('../util/userdatabase');
const  expenselist= database.define('expenses',{
    id:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    price: sequelize.INTEGER,
    description:sequelize.STRING,
    category:sequelize.STRING,
});

module.exports= expenselist;