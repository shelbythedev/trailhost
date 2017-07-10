let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
  alias: {type: String, required: true},
  client_id: {type: String, required: true},
  submission_count: {type: Number, default: 0},
  created_at: {type: Date, default: new Date}
})

mongoose.model('User', UserSchema)
