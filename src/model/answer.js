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
 * Answer Model
 */
class AnswerClass extends Sequelize.Model {
}

/**
 * Initialises topic model
 */
async function initAnswer () {
  let sequelizeInstance
  await dbController.dbInterface.getSequelizeConnection().then(resolve => {
    console.log('resolved')
    sequelizeInstance = resolve
  }, () => {
    console.log('reject123')
  })
  AnswerClass.init(
    // attributes
    {
      answer: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isCorrect: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },
    // options
    {
      sequelizeInstance,
      modelName: 'answer'
    }
  )
}

/**
 * Makes functions globally available
 */
exports.answer = {
  initAnswer: initAnswer,
  answerClass: AnswerClass
}
