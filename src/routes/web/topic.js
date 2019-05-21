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
    res.render('topic', {
      topics: data
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
 * Adds a new topic to the DB
 */
router.post('/', [
  body('topicName')
    .isLength({min: 1}),
  body('topicId')
    .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    try {
      const data = await database.dbInterface.addTopic(req.body.subjectName, req.body.userId)
      res.json({data})
    } catch (e) {
      next({message: 'Something went wrong'})
    }
  } else {
    res.render('Topic', {
      title: 'Topic Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

router.post('/update', [
  body('topicName')
    .isLength({min: 1}),
  body('topicId')
    .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    try {
      const data = await database.dbInterface.updateSubject(req.body.subjectName, req.body.subjectId)
      res.json({data})
    } catch (e) {
      next({message: 'Something went wrong'})
    }
  } else {
    res.render('Topic', {
      title: 'Topic Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

/**
 * Deletes a particular topic
 */
router.delete('/:id([0-9]+)', async (req, res, next) => {
  try {
    const data = await database.dbInterface.deleteSubject(req.params.id)
    res.json({data})
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

module.exports = router
