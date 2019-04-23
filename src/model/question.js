/**
 * Created by Michael Bielang on 20.04.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
const Sequelize = require('sequelize')
const dbController = require('../controller/db_controller')

/**
 * Question Model
 */
class Question extends Sequelize.Model {
}

async function initQuestion () {
  let sequelizeInstance
  await dbController.dbInterface.getSequelizeConnection().then(resolve => {
    console.log('resolved')
    sequelizeInstance = resolve
  }, () => {
    console.log('reject123')
  })
  Question.init(
    // attributes
    {
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },
    // options
    {
      sequelizeInstance,
      modelName: 'question'
    }
  )
}

/**
 * Makes functions available globally
 */
exports.question = {
  initQuestion: initQuestion,
  questionClass: Question
}
