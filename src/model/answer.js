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
  storage: './user.db'
})
sequelize.sync()

/**
 * Answer Model
 */
class AnswerClass extends Sequelize.Model {
}

/**
 * Makes functions globally available
 * @type {{subjectClass: AnswerClass, initAnswer: (function(): Promise<*>)}}
 */
exports.answer = {
  initAnswer: initAnswer,
  answerClass: AnswerClass
}

/**
 * Initialises topic model
 * @returns {Promise<*>}
 */
async function initAnswer () {
  return new Promise(resolve => {
    AnswerClass.init(
      // attributes
      {
        answer: {
          type: Sequelize.STRING(10000),
          allowNull: false
        }
      },
      // options
      {
        sequelize,
        modelName: 'answer'
      }
    )
    resolve()
  })
}
