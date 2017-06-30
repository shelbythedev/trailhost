let mongoose = require('mongoose')
let dbConnection = process.env.DBCONNECTION || 'mongodb://localhost/trailhost'

mongoose.connect(dbConnection, (err) => {
  if (err){
    console.log(err)
  } else {
    console.log('Connected to DB')
  }
})
