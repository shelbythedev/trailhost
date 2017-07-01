let express = require('express')
let mongoose = require('mongoose')
let router = express.Router()
let jwt = require('jwt-simple')
let uuid = require('uuid')

let db = require('../../../config/database')
    Client = mongoose.model('Client')

// Create new Client
router.post('/', (req, res, next) => {
  let client = new Client({
      name: req.body.name,
      uid: uuid.v4(),
      secret: uuid.v1()
  })

  client.save((err) => {
    if (err){
      res.status(500).json(err.errors)
    }else{
      res.status(200).json(client)
    }
  })
})

module.exports = router
