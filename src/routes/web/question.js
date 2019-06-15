const express = require('express')
const {body, validationResult} = require('express-validator/check/index')
const database = require('../../controller/db_controller')
const router = express.Router()

/**
 * Displays all topics belonging to a particular set
 */
router.get('/getAll/:setId([0-9]+)', async (req, res, next) => {
  try {
    const data = await database.dbInterface.getQuestions(req.params.setId)
    const set = await database.dbInterface.getSet(req.params.setId)
    res.render('question', {
      questions: data,
      setId: req.params.setId,
      set: set[0].dataValues.setName
    })
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

router.get('/:id([0-9]+)', async (req, res) => {
  const question = await database.dbInterface.getQuestion(req.params.id)
  res.render('question_edit', {
    question: question[0].dataValues
  })
})

/**
 * Adds a new question
 */
router.post('/', [
  body('question')
    .isLength({min: 1}),
  body('setId')
    .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    try {
      await database.dbInterface.addQuestion(req.body.question, req.body.setId)
      res.redirect('back')
    } catch (exception) {
      next({message: exception})
    }
  } else {
    res.render('error', {
      title: 'Question Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

/**
 * Updates a new topic
 */
router.post('/update', [
  body('question')
    .isLength({min: 1}),
  body('questionId')
    .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    try {
      await database.dbInterface.updateQuestion(req.body.question, req.body.questionId)
      const question = await database.dbInterface.getQuestion(req.body.questionId)
      res.redirect('/question/getAll/' + question[0].setId)
    } catch (exception) {
      next({message: exception})
    }
  } else {
    res.render('error', {
      title: 'Question Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

router.get('/delete/:id([0-9]+)', async (req, res, next) => {
  try {
    await database.dbInterface.deleteQuestion(req.params.id)
    res.redirect('back')
  } catch (exception) {
    next({message: exception})
  }
})

module.exports = router

