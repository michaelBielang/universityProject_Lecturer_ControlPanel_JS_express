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
  res.render('register', {title: 'Register'})
})

router.post('/', [
  body('email')
    .isLength({min: 1})
    .withMessage('Please enter an email'),
  body('password')
    .isLength({min: 1})
    .withMessage('Please enter a password'),
], async function (req, res) {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    res.send('Thank you for your registration!')
    console.log(body('email'))
    const userId = database.dbInterface.addUser(req.email, req.password)
    console.log(userId)
  } else {
    res.render('register', {
      title: 'Registration form',
      errors: errors.array(),
      data: req.body,
    })
  }
})

module.exports = router
