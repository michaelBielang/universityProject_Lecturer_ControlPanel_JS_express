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
  }
})
sequelize.sync()

/**
 // * Topic Model
 */
class Topic extends Sequelize.Model {
}

/**
 * Initialises topic model
 * @returns {Promise<*>}
 */
function initTopic () {
  Topic.init(
    // attributes
    {
      topicName: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    // options
    {
      sequelize,
      modelName: 'topic'
    }
  )
}

/**
 * Makes functions globally available
 * @type {{initTopic: (function(): Promise<*>), topicClass: Topic}}
 */
exports.topic = {
  initTopic: initTopic,
  topicClass: Topic
}
