// Dependencies
let express = require('express')
let path = require('path')
let logger = require('morgan')
let bodyParser = require('body-parser')

// Public API files
let client = require('./routes/api/v1/client')

// Private API files
let privateClient = require('./routes/api/private_api/client')

// Initialize Express
let app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// Call in dependencies
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Public API routes
app.use('/api/v1/client', client)

// Private API routes
app.use('/private_api/client', privateClient)

// Index handler
app.use((req, res, next) => {
  res.status(200).send("Access to the TrailHost API via browser is not encouraged. Please visit https://github.com/shelbythedev/trailhost for more information.")
})

// 404 handler: catch and send to error handlers
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handlers below

// Development environment errors print stacktrace
if (app.get('env') === 'development'){
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({error: err.message})
  })
}

// Production environment will not reveal stacktrace to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({error: "Internal server error"})
})


module.exports = app
