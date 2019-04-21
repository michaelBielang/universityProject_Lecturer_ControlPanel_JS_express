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
 * Question Model
 */
class Question extends Sequelize.Model {
}

/**
 * Makes functions available globally
 * @type {{questionClass: Question, initQuestion: (function(): Promise<*>)}}
 */
exports.question = {
  initQuestion: initQuestion,
  questionClass: Question
}

async function initQuestion () {
  return new Promise(resolve => {
    Question.init(
      // attributes
      {
        question: {
          type: Sequelize.STRING(1000),
          allowNull: false
        }
      },
      // options
      {
        sequelize,
        modelName: 'question'
      }
    )
    resolve()
  })
}
