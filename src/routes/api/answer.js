const express = require('express')
const database = require('../../controller/db_controller')
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

module.exports = router
