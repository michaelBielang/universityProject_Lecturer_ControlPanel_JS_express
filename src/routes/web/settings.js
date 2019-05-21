/**
 * Created by Michael Bielang on 21.05.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */

const express = require('express')
const database = require('../../controller/db_controller')
const router = express.Router()

router.get('/', async (req, res) => {
  res.render('settings', {
    msg: 'Wipe Data',
    disabled: false
  })
})

router.get('/wipe', async (req, res) => {
  database.dbInterface.dropDb()
    .then(() => {
      res.render('settings', {
        response: 'Data Wiped',
        disabled: true
      })
    }).catch((err) => {
    res.render('settings', {
      response: 'Failure: ' + err,
      disabled: true
    })
  })
})

module.exports = router
