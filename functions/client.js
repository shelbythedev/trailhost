// Dependencies
let mongoose = require('mongoose'),
    express = require('express'),
    db = require('../config/database'),
    jwt = require('jwt-simple')

// Models
let Clients = mongoose.model('Client')

// generate token for client
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

// get client by token
let findByToken = (token, callback) => {
  let error = null

  Clients.findOne({ token: token }).exec((err, client) => {
    if (err) error = err
    return callback(error, client)
  })
}

// update client
let updateClient = (token, clientData, callback) => {
  let error = null

  Clients.findOne({ token: token }).exec((err, client) => {
    if (err) error = err
    client.name = clientData.name
    client.save(err => {
      if (err) error = err
    })
    return callback(error, client)
  })
}

let Client = {
  createToken: createToken,
  findByToken: findByToken,
  update: updateClient
}

module.exports = Client
