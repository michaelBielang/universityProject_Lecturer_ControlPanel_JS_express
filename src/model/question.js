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
 * Question Model
 */
class Question extends Sequelize.Model {
}

function initQuestion () {
  Question.init(
    // attributes
    {
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      topicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'topics',
          key: 'id'
        }
      }
    },
    // options
    {
      sequelize,
      modelName: 'question'
    }
  )
}

/**
 * Makes functions available globally
 * @type {{questionClass: Question, initQuestion: (function(): Promise<*>)}}
 */
exports.question = {
  initQuestion: initQuestion,
  questionClass: Question
}
