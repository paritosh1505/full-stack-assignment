const express = require('express');
const router = express.Router();
const routecontrol = require('../controller/usercontrol');
const userauthenticate = require('../middleware/auth');
router.get('/', routecontrol.postfile)
 router.get('/loginpage.html',routecontrol.loginsend);
router.get('/signup.html',routecontrol.postfile);
router.get('/expensepage.html',routecontrol.expensepagesend);
router.get('/data' ,userauthenticate.authorisation ,routecontrol.getdata);
router.post('/signup', routecontrol.adduser);
router.post('/login',routecontrol.login);
router.post('/expense',routecontrol.addexpense);
router.delete('/delete/:id',routecontrol.deleteentry);
module.exports = router;
