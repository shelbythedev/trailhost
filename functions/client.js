// Dependencies
let mongoose = require('mongoose'),
    express = require('express'),
    db = require('../config/database'),
    jwt = require('jwt-simple')

// Models
let Clients = mongoose.model('Client')

let createToken = (uid, secret, callback) => {
  let error, token = null

  Clients.findOne({uid: uid, secret: secret}, (err, client) => {
    if (err) error = err
    if (client) {
      // generate token
      token = jwt.encode({ created: new Date() }, client.secret)

      client.token = token
      client.save()
    } else {
      // client not found
      error = 'Client was not found. Ensure UID and SECRET are correct.'
    }

    callback(error, token)
  })
}

let Client = {
  createToken: createToken
}

module.exports = Client
