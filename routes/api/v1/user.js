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

// CREATE USER
router.post('/', (req, res, next) => {
  User.create(req.session.client._id, req.body, (err, user) => {
    if (err) return next(new Error(err))
    res.status(200).json(user)
  })
})

module.exports = router
