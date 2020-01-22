const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController');

router.get('/loginCallback', controller.loginCallback, controller.getProfile, controller.authenticate, controller.generateJWTandRedirect);

router.get('/checkSessionValidity', controller.checkSession);

router.get('/checkValidity', controller.checkValidity);

router.get('/generateJWT', controller.generateJWT);

module.exports = router;