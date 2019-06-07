/**
 * Created by Michael Bielang on 15.05.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
const express = require('express')
const router = express.Router()
const session = require('express-session')

router.get('/', async (req, res) => {
  if (session.user) {
    req.session.destroy(function () {
      session.user = undefined
      res.redirect('/')
    })
  } else {
    res.redirect('/')
  }
})

module.exports = router
