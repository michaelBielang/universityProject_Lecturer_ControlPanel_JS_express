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
 // * Subject Model
 */
class Subject extends Sequelize.Model {
}

/**
 * Makes functions globally available
 * @type {{initSubject: (function(): Promise<*>), subjectClass: Subject}}
 */
exports.subject = {
  initSubject: initSubject,
  subjectClass: Subject
}

/**
 * Initialises subject model
 * @returns {Promise<*>}
 */
async function initSubject () {
  return new Promise(resolve => {
    Subject.init(
      // attributes
      {
        subjectName: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      // options
      {
        sequelize,
        modelName: 'subject'
      }
    )
    resolve()
  })
}
