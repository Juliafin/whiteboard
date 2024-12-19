
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const welcome_router = express.Router();
const path = require('path');
const express_jwt = require('express-jwt');
const { SECRET } = process.env;
const jwt = require('jsonwebtoken');


welcome_router.use(bodyParser.json());

welcome_router.use('/', express.static(process.cwd() + '/public/login_registration'));
welcome_router.use('/dashboard/:username', express.static(process.cwd() + '/public/dashboard'));

module.exports = welcome_router;