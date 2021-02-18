const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController.js');
const { isLoggedIn, isLoggedOut } = require('../controllers/authController');

const validateRegistration = require('../middlewares/validator').validateRegistration;
const validateLogin = require('../middlewares/validator').validateLogin;

const flash = require('connect-flash');

router.get('/Login', isLoggedOut, userController.getUserLogin);

router.post('/Login', isLoggedOut, validateLogin, userController.postUserLogin);


router.get('/Signup', isLoggedOut, userController.getUserCreate);

router.post('/Signup', isLoggedOut, validateRegistration, userController.postUserCreate);

router.get('/logout', isLoggedIn, userController.getUserLogout);


module.exports = router