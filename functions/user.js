// Dependencies
let mongoose = require('mongoose'),
    express = require('express'),
    db = require('../config/database'),
    jwt = require('jwt-simple')

// Models
let Users = mongoose.model('User')

// create new user
let create = (clientId, user, callback) => {
  let error = null

  let newUser = {
    alias: user["alias"],
    client_id: clientId,
  }

  let userData = new Users(newUser)

  userData.save(err => {
    if (err) error = err
  })

  callback(error, userData)
}

let User = {
  create: create
}

module.exports = User
