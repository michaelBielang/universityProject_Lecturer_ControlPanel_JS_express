const express = require('express')
const {body, validationResult} = require('express-validator/check/index')
const database = require('../../controller/db_controller')
const router = express.Router()

/**
 * Displays all topics belonging to a particular subject
 */
router.get('/getAll/:subjectId([0-9]+)', async (req, res, next) => {
  try {
    const data = await database.dbInterface.getTopics(req.params.subjectId)
    const subject = await database.dbInterface.getSubject(req.params.subjectId)
    res.render('topic', {
      topics: data,
      subjectId: req.params.subjectId,
      subject: subject[0].dataValues.subjectName
    })
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

router.get('/:id([0-9]+)', async (req, res) => {
  const topic = await database.dbInterface.getTopic(req.params.id)
  res.render('topic_edit', {
    topic: topic[0].dataValues
  })
})

/**
 * Adds a new topic
 */
router.post('/', [
  body('topicName')
    .isLength({min: 1}),
  body('subjectId')
    .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    try {
      await database.dbInterface.addTopic(req.body.topicName, req.body.subjectId)
      console.log('arrived')
      res.redirect('/dvw/topic/getAll/' + req.body.subjectId)
    } catch (exception) {
      next({message: exception})
    }
  } else {
    res.render('error', {
      title: 'Topic Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

/**
 * Updates a new topic
 */
router.post('/update', [
  body('topicName')
    .isLength({min: 1}),
  body('topicId')
    .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    try {
      await database.dbInterface.updateTopic(req.body.topicName, req.body.topicId)
      const topic = await database.dbInterface.getTopic(req.body.topicId)
      res.redirect('/dvw/topic/getAll/' + topic[0].subjectId)
    } catch (exception) {
      next({message: exception})
    }
  } else {
    res.render('error', {
      title: 'Topic Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

router.get('/delete/:id([0-9]+)', async (req, res, next) => {
  try {
    await database.dbInterface.deleteTopic(req.params.id)
    res.redirect('back')
  } catch (exception) {
    next({message: exception})
  }
})

module.exports = router

