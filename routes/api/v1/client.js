let express = require('express')
let router = express.Router()
let Client = require('../../../function/client')
let auth = require('../../../lib/authentication')

// run client authentication before routing
router.use((req, res, next) => {
  if (req.url == '/' && req.method == 'POST') {
    // if posting to root, skip validation
    next()
  } else if (req.url == '/token'){
    // requesting token: ensure UID and SECRET are in headers of request
    if (!req.headers.uid) return res.status(401).json({ error: 'Missing UID for Client' })
    if (!req.headers.secret) return res.status(401).json({ error: 'Missing SECRET for Client' })
    next()
  } else {
    // check token for valid and non-expired
    auth.check({ token: req.headers.token }, (err, clientData) => {
      console.log(err)
      if (err) next(new Error(err))
      req.session.client = clientData
      next()
    })
  }
})

module.exports = router
