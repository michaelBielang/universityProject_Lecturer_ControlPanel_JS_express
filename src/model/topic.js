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

/**
 // * Topic Model
 */
class Topic extends Sequelize.Model {
}

/**
 * Makes functions globally available
 * @type {{initTopic: (function(): Promise<*>), topicClass: Topic}}
 */
exports.topic = {
  initTopic: initTopic,
  topicClass: Topic
}

/**
 * Initialises topic model
 * @returns {Promise<*>}
 */
async function initTopic () {
  return new Promise(resolve => {
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
    resolve()
  })
}
