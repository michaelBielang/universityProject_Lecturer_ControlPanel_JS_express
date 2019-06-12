const express = require('express')
const database = require('../../controller/db_controller')
const router = express.Router()

router.get('/getAll/:userId([a-zA-Z]+)', async (req, res, next) => {
  console.log('Test')
  try {
    const data = await database.dbInterface.getSubjects(req.params.userId)
    res.json({data})
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

router.get('/:id([0-9]+)', async (req, res, next) => {
  try {
    const test = await database.dbInterface.getSubjects('nrg')
    console.log(test)
    const data = await database.dbInterface.getSubject(req.params.id)
    res.json({data})
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

module.exports = router
