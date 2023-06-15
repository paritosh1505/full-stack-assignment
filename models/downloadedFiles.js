const sequelize = require('sequelize');
const database = require('../util/userdatabase');

const  downloadedfile = database.define('downloadedFiles', {
    id:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fileUrl: sequelize.STRING
})

module.exports = downloadedfile