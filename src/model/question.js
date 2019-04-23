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

const question = db.define('question', {
  // attributes
  question: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = question
