// Dependencies
let mongoose = require('mongoose'),
    express = require('express'),
    db = require('../config/database'),
    jwt = require('jwt-simple')

// Models
let Users = mongoose.model('User')

// get all users
// accepts 'client_id' to return users per client
let getAll = (clientId, callback) => {
  let error = null

  if (clientId){
    Users.find({client_id: clientId}, (err, users) => {
      if (err) error = err
      callback(error, users)
    })
  }else{
    Users.find({}, (err, users) => {
      if (err) error = err
      callback(error, users)
    })
  }
}

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

// find user by ID
let find = (userId, callback) => {
  let error = null

  Users.findOne({_id: userId}, (err, user) => {
    if (err) error = err
    callback(error, user)
  })
}

// update user
let update = (userId, clientId, userData, callback) => {
  let error = null

  Users.findOneAndUpdate({_id: userId, client_id: clientId}, userData, {new: true}, (err, user) => {
    if (err) error = err
    callback(error, user)
  })
}

let User = {
  getAll: getAll,
  create: create,
  find: find,
  update: update
}

module.exports = User
