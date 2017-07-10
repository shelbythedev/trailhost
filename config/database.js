let mongoose = require('mongoose')
let dbConnection = process.env.DBCONNECTION || 'mongodb://localhost/trailhost'

mongoose.connect(dbConnection, (err) => {
  if (err){
    console.log(err)
  } else {
    console.log('Connected to DB')
  }
})

mongoose.set('debug', true)

mongoose.connection.on('error', (err) => {
  console.log('MongoDB error: %s', err)
})

module.exports = mongoose
require('../models/client')
require('../models/user')
