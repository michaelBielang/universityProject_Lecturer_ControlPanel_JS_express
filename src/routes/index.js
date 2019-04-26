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
var router = express.Router()

/* GET home page. */
router.get('/', async function (req, res) {
  res.render('index', {title: 'HSA Training App'})
})

router.get('/topics/:subjectId([0-9]+)', function (req, res) {
  const data = database.getTopics(req.params.subjectId)
  res.json({data})
})

router.get('/topic/:id([0-9]+)', (req, res) => {
  const data = database.getTopic(req.params.id)
  res.json({data})
})

router.get('/subjects/:userId([0-9]+)', function (req, res) {
  const data = database.getSubjects(req.params.userId)
  res.json({data})
})

router.get('/subject/:id([0-9]+)', (req, res) => {
  const data = database.getSubject(req.params.id)
  res.json({data})
})

router.post('/subject', [
  body('subjectName')
    .isLength({min: 1}),
  body('userId')
    .isLength({min: 1}),
], (req, res) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    const data = database.addSubject(req.subjectName, req.userId)
    res.json({data})
  } else {
    res.render('Subject', {
      title: 'Subject Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

router.post('/updateSubject', [
  body('subjectName')
    .isLength({min: 1}),
  body('subjectId')
    .isLength({min: 1}),
], (req, res) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    const data = database.updateSubject(req.subjectName, req.subjectId)
    res.json({data})
  } else {
    res.render('Subject', {
      title: 'Subject Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

router.delete('/subject', [
  body('subjectId').isLength({min: 1})
], (req, res) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    const data = database.deleteSubject(req.subjectId)
    res.json({data})
  } else {
    res.render('Subject', {
      title: 'Subject Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})
module.exports = router
