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
db.sync()

const user = db.define('user', {
  // attributes
  rzId: {
    type: Sequelize.TEXT,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = user

