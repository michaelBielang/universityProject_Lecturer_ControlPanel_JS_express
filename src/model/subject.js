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

const subject = db.define('subject', {
  // attributes
  subjectId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  subjectName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.TEXT,
    references: {
      model: 'users',
      key: 'userId',
    },
    onDelete: 'CASCADE'
  }
})

module.exports = subject
