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
 // * Subject Model
 */
class Subject extends Sequelize.Model {
}

/**
 * Initialises subject model
 */
async function initSubject () {
  let sequelizeInstance
  await dbController.dbInterface.getSequelizeConnection().then(resolve => {
    console.log('resolved')
    sequelizeInstance = resolve
  }, () => {
    console.log('reject123')
  })
  Subject.init(
    // attributes
    {
      subjectName: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },
    // options
    {
      sequelizeInstance,
      modelName: 'subject'
    }
  )
}

/**
 * Makes functions globally available
 */
exports.subject = {
  initSubject: initSubject,
  subjectClass: Subject
}
