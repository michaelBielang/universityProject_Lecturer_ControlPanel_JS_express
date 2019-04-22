/**
 * Created by Michael Bielang on 20.04.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../controller/user.sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
})
sequelize.sync()

/**
 * Answer Model
 */
class AnswerClass extends Sequelize.Model {
}

/**
 * Initialises topic model
 * @returns {Promise<*>}
 */
function initAnswer () {
  AnswerClass.init(
    // attributes
    {
      answer: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'questions',
          key: 'id'
        }
      }
    },
    // options
    {
      sequelize,
      modelName: 'answer'
    }
  )
}

/**
 * Makes functions globally available
 * @type {{subjectClass: AnswerClass, initAnswer: (function(): Promise<*>)}}
 */
exports.answer = {
  initAnswer: initAnswer,
  answerClass: AnswerClass
}
