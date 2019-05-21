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

const set = db.define('set', {
  // attributes
  setId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  setName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  topicId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'topics',
      key: 'topicId',
    },
    onDelete: 'CASCADE'
  }
})

module.exports = set
