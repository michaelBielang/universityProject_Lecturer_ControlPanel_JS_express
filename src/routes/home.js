/**
 * Created by Michael Bielang on 15.05.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
const express = require('express')
const database = require('../controller/db_controller')
const router = express.Router()

router.get('/', async (req, res) => {
  res.render('home', {Msg: 'Welcome'})
})

module.exports = router
exports.userId = ''
