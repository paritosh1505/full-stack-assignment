const Sequelize = require('sequelize');
const sequel = require('../util/userdatabase')

const Order = sequel.define('orders',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentid: Sequelize.STRING,
    orderid: Sequelize.STRING,
    status: Sequelize.STRING

})

module.exports= Order;