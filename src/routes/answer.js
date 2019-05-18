const express = require('express')
const {body, validationResult} = require('express-validator/check')
const database = require('../controller/db_controller')
const router = express.Router()

router.get('/getAll/:questionId([0-9]+)', async (req, res, next) => {
  try {
    const data = await database.dbInterface.getAnswers(req.params.questionId)
    res.json({data})
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

router.get('/:answerId([0-9]+)', async (req, res, next) => {
  try {
    const data = await database.dbInterface.getAnswer(req.params.answerId)
    res.json({data})
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

router.post('/', [
  body('content')
    .isLength({min: 1}),
  body('isCorrect')
    .isLength({min: 1}),
  body('questionId')
    .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    try {
      const data = await database.dbInterface.addAnswer(req.content, req.isCorrect, req.questionId)
      res.json({data})
    } catch (e) {
      next({message: 'Something went wrong'})
    }
  } else {
    res.render('error', {
      title: 'Question Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

router.post('/update', [
  body('newAnswer')
    .isLength({min: 1}),
  body('answerId')
    .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    try {
      const data = await database.dbInterface.updateAnswer(req.newAnswer, req.answerId)
      res.json({data})
    } catch (e) {
      next({message: 'Something went wrong'})
    }
  } else {
    res.render('error', {
      title: 'AnswerError',
      errors: errors.array(),
      data: req.body,
    })
  }
})

router.delete('/:id([0-9]+)', async (req, res, next) => {
  try {
    const data = await database.dbInterface.deleteAnswer(req.params.id)
    res.json({data})
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

module.exports = router
