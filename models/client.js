let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ClientSchema = new Schema({
  name: {type: String, required: true},
  uid: {type: String, required: true},
  secret: {type: String, required: true},
  token: String
})

mongoose.model('Client', ClientSchema)
