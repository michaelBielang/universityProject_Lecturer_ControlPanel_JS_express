/**
 * Created by Michael Bielang on 31.03.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */

const express = require('express')
const {body, validationResult} = require('express-validator/check')
const database = require('../controller/db_controller')

const router = express.Router()

/* GET home page. */
router.get('/', async function (req, res) {
  await database.dbInterface.initDb()
  await database.dbInterface.dropDb()
  res.render('register', {title: 'Register'})
})

router.post('/', [
  body('email')
    .isEmail()
    .withMessage('Please enter an email'),
  body('password')
    .isLength({min: 7})
    .withMessage('Please enter a password'),
], async function (req, res) {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    res.send('Thank you for your registration!')

    //could be further implemented but so far not wanted by Prof. Metzner
    //if it will be continued you need to implement a hash function here for the password before storing it!

    /*
    const hashedPw = hashPassword(req.body.password)
    const userId = await database.dbInterface.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.title, hashedPw)
        */
  } else {
    res.render('register', {
      title: 'Registration form',
      errors: errors.array(),
      data: req.body,
    })
  }
})

module.exports = router
