'use strict'

// Dependencies
let express = require('express')
let mongoose = require('mongoose')
let jwt = require('jwt-simple')

let db = require('../config/database'),
    Client = mongoose.model('Client')

let authenticate = {

  // Check Auth token
  check: (options = {}, callback) => {
    let error = null
    let returnData = null

    if (!options.token) return callback("Your token is missing or expired. Use /token to authenticate again. [00]", returnData)

    // Validation
    Client.findOne({token: options.token}, (err, client) => {
      // Validate token and set client in session
      if (err) error = err

      if (!client){
        error = "Your token is missing or expired. Use /token to authenticate again. [01]"
      } else {
        // Validate token is not expired
        let tokenData = jwt.decode(options.token, client.secret)
        let currentDate = new Date()
        let d1 = new Date(new Date(tokenData.created).getTime() + 60 * 60 * 24 * 1000)
        let d2 = new Date(d1)
        d2.setHours(d1.getHours() + 24)

        if (d2 <= currentDate){
          // Token expired
          error = "Client token has expired"
        } else {
          // Token is valid
          returnData = client
        }
      }

      return callback(error, returnData)
    })
  }
}

module.exports = authenticate
