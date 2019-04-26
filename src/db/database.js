/**
 * Created by Michael Bielang on 23.04.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */

const Sequelize = require('sequelize')
const path = require('path')
const dbPath = path.join(__dirname, './cpse.sqlite')

exports.sequeliceInstance = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
})



