// Dependencies
let express = require('express'),
    router = express.Router(),
    User = require('../../../functions/user'),
    auth = require('../../../lib/authentication')

// run client authentication before routing
router.use((req, res, next) => {
  // check token for valid and non-expired
  auth.check({ token: req.headers.token }, (err, clientData) => {
    console.log(err)
    if (err) next(new Error(err))
    req.session.client = clientData
    next()
  })
})

// GET ALL USERS
// if includes query param 'client_id', returns all users per given Client ID
router.get('/', (req, res, next) => {
  User.getAll(req.query.client_id, (err, users) => {
    if (err) return next(new Error(err))
    res.status(200).json(users)
  })
})

// CREATE USER
router.post('/', (req, res, next) => {
  User.create(req.session.client._id, req.body, (err, user) => {
    if (err) return next(new Error(err))
    res.status(200).json(user)
  })
})

// GET USER BY ID
router.get('/:id', (req, res, next) => {
  User.find(req.params.id, (err, user) => {
    if (err) return next(new Error(err))
    res.status(200).json(user)
  })
})

// UPDATE USER
// User can be updated from related Client ONLY
router.put('/:id', (req, res, next) => {
  User.update(req.params.id, req.session.client._id, req.body, (err, user) => {
    if (err) return next(new Error(err))
    res.status(200).json(user)
  })
})

module.exports = router
