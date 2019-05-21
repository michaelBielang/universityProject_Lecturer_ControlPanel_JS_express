/**
 * Created by Michael Bielang on 15.05.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
const express = require('express')
const database = require('../../controller/db_controller')
const router = express.Router()
const session = require('express-session')

router.get('/', async (req, res) => {
  if (session.user) {
    const subjects = await database.dbInterface.getSubjects(session.user)
    console.log(subjects)
    res.render('home', {
      subjects: subjects
    })
  } else {
    res.redirect('/')
  }
})

module.exports = router
