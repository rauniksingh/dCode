const express = require('express'),
      app = express.Router(),
      user = require('../services/user');

const {login} = require('../middleware/validator')

app.post('/user/register', login, user._registerUser)
   .post('/user/login', login, user._LoginUser)

module.exports = app;      