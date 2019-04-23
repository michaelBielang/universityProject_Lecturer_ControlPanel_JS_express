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
 // * Topic Model
 */
class Topic extends Sequelize.Model {
}

/**
 * Initialises topic model
 */
async function initTopic () {
  let sequelizeInstance
  await dbController.dbInterface.getSequelizeConnection().then(resolve => {
    console.log('resolved')
    sequelizeInstance = resolve
  }, () => {
    console.log('reject123')
  })
  Topic.init(
    // attributes
    {
      topicName: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },
    // options
    {
      sequelizeInstance,
      modelName: 'topic'
    }
  )
}

/**
 * Makes functions globally available
 */
exports.topic = {
  initTopic: initTopic,
  topicClass: Topic
}
