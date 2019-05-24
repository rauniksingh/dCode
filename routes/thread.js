const express = require('express'),
      app = express.Router(),
      auth = require('../middleware/authentication')
      thread = require('../services/thread');

app.post('/add', auth.authentication, thread._postThread)
   .get('/getThread', auth.authentication, thread._getThreads)
   .put('/updateThread/:id', auth.authentication, thread._updateThread)
   .delete('/deleteThread/:id', auth.authentication, thread._deleteThread)

module.exports = app;      