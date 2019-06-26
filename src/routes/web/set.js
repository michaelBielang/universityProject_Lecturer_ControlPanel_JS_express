const express = require('express')
const {body, validationResult} = require('express-validator/check/index')
const database = require('../../controller/db_controller')
const router = express.Router()

router.get('/getAll/:topicId([0-9]+)', async (req, res, next) => {
  try {
    const data = await database.dbInterface.getSets(req.params.topicId)
    const topic = await database.dbInterface.getTopic(req.params.topicId)
    res.render('set', {
      sets: data,
      topicId: req.params.topicId,
      topic: topic[0].dataValues.topicName
    })
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

router.get('/:id([0-9]+)', async (req, res) => {
  const set = await database.dbInterface.getSet(req.params.id)
  res.render('set_edit', {
    set: set[0].dataValues
  })
})

router.post('/', [
  body('setName')
    .isLength({min: 1}),
  body('topicId')
    .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    try {
      await database.dbInterface.addSet(req.body.setName, req.body.topicId)
      res.redirect('back')
    } catch (exception) {
      next({message: exception})
    }
  } else {
    res.render('error', {
      title: 'set Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

router.post('/update', [
  body('setName')
    .isLength({min: 1}),
  body('setId')
    .isLength({min: 1}),
], async (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    try {
      await database.dbInterface.updateSet(req.body.setName, req.body.setId)
      const set = await database.dbInterface.getSet(req.body.setId)
      res.redirect('/dvw/set/getAll/' + set[0].topicId)
    } catch (exception) {
      next({message: exception})
    }
  } else {
    res.render('error', {
      title: 'Set Error',
      errors: errors.array(),
      data: req.body,
    })
  }
})

router.get('/delete/:id([0-9]+)', async (req, res, next) => {
  try {
    await database.dbInterface.deleteSet(req.params.id)
    res.redirect('back')
  } catch (exception) {
    next({message: exception})
  }
})

module.exports = router
