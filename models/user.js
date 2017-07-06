let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  submission_count: {type: Number, default: 0}
})

mongoose.model('User', UserSchema)
