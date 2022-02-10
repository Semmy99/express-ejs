const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/login', (req, res) => {
  usersController.authenticationUser(req, res)
})

module.exports = { usersRouter: router };

