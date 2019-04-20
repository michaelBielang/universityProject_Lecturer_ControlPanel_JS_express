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
sequelize.sync()

/**
 * User Model
 */
class User extends Sequelize.Model {
}

/**
 * Makes functions available globally
 * @type {{userClass: User, initUser: (function(): Promise<*>)}}
 */
exports.user = {
  initUser: initUser,
  userClass: User
}

/**
 * Init user model
 * @returns {Promise<*>}
 */
async function initUser () {
  return new Promise(resolve => {
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
          type: Sequelize.STRING(20000),
          allowNull: false
        }
      },
      // options
      {
        sequelize,
        modelName: 'user'
      }
    )
    resolve()
  })
}
