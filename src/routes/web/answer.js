const express = require('express')
const {body, validationResult} = require('express-validator/check/index')
const database = require('../../controller/db_controller')
const router = express.Router()

/**
 * Displays all answers belonging to a particular question
 */
router.get('/getAll/:questionId([0-9]+)', async (req, res, next) => {
  try {
    const data = await database.dbInterface.getAnswers(req.params.questionId)
    const question = await database.dbInterface.getQuestion(req.params.questionId);
    res.render('answer', {
      answers: data,
      questionId: req.params.questionId,
      question: question[0].dataValues.question,
    })
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

router.get('/:id([0-9]+)', async (req, res) => {
  const answer = await database.dbInterface.getAnswer(req.params.id)
  res.render('answer_edit', {
    answer: answer[0].dataValues
  })
})

/**
 * Adds a new question
 */
router.post('/', [
  body('answer')
      .isLength({min: 1}),
  body('isCorrect')
      .isLength({min:1}),
  body('questionId')
      .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    try {
      await database.dbInterface.addAnswer(req.body.answer, req.body.isCorrect, req.body.questionId)
      res.redirect('back')
    } catch (exception) {
      next({message: exception})
    }
  }
})

/**
 * Updates a new topic
 */
router.post('/update', [
  body('answer')
      .isLength({min: 1}),
  body('isCorrect')
      .isLength({min:1}),
  body('answerId')
      .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    try {
      await database.dbInterface.updateAnswer(req.body.answer, req.body.isCorrect, req.body.answerId)
      const answer = await database.dbInterface.getAnswer(req.body.answerId)
      res.redirect('/answer/getAll/' + answer[0].questionId)
    } catch (exception) {
      next({message: exception})
    }
  } else {
    res.render('error', {
      title: 'Answer Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

router.get('/delete/:id([0-9]+)', async (req, res, next) => {
  try {
    await database.dbInterface.deleteAnswer(req.params.id)
    res.redirect('back')
  } catch (exception) {
    next({message: exception})
  }
})

module.exports = router

