const express = require('express');
const route = express.Router();
const controller = require('../controller/passwordRecovery');

route.post('/forgotpassword',controller.sendmail )

module.exports= route;