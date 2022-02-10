const express = require('express');
const usersServicce = require('../services/users.service');
const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json());


class UsersController {
  authenticationUser(req, res) {
    res.status(201).send(usersServicce.authenticationUser());
  }
}

const usersController = new UsersController()

module.exports = usersController