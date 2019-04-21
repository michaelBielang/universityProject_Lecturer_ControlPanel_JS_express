/**
 * Created by Michael Bielang on 31.03.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'HSA Training App'})
})


module.exports = router
