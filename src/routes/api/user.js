const express = require('express')
const database = require('../../controller/db_controller')
const router = express.Router()

router.get('/getAll', async (req, res, next) => {
  try {
    const data = await database.dbInterface.getUsers()
    res.json({data})
  } catch (e) {
    next({message: 'Something went wrong'})
  }
})

module.exports = router
