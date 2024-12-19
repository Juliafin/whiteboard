
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const welcome_router = express.Router();
const path = require('path');


welcome_router.use(bodyParser.json());

welcome_router.use('/', express.static(process.cwd() + '/public/login_registration'));
welcome_router.use('/dashboard/:username', express.static(process.cwd() + '/public/dashboard'));

module.exports = welcome_router;