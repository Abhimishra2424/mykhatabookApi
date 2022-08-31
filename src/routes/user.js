'use strict';

var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');

router.post('/user/register', userController.createUser);
router.post("/user/login", userController.loginUser);


// router.get("/company/getallcompanies", userController.getAllCompanies);


module.exports = router;