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
    const subjects = await database.dbInterface.getSubjects(session.user)
    res.render('home', {
      subjects: subjects,
      userId: session.user
    })
})

module.exports = router
