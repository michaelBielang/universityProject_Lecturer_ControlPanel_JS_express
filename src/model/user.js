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
  },
  logging: false
})
sequelize.sync()

/**
 * User Model
 */
class User extends Sequelize.Model {
}

/**
 * Init user model
 * @returns {Promise<*>}
 */

function initUser () {
  //TODO optional realize with sequelize.transaction
  User.init(
    // attributes
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },
    // options
    {
      sequelize,
      modelName: 'user'
    }
  )
}

/**
 * Makes functions available globally
 * @type {{userClass: User, initUser: (function(): Promise<*>)}}
 */
exports.user = {
  initUser: initUser,
  userClass: User
}
