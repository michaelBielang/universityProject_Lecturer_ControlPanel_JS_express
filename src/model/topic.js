/**
 * Created by Michael Bielang on 20.04.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
const Sequelize = require('sequelize')
const db = require('../db/database').sequeliceInstance
/**
 * Initialises topic model
 */
const topic = db.define('topic', {
  // attributes
  topicName: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = topic
