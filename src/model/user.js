/**
 * Created by Michael Bielang on 20.04.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */

const dbController = require('../controller/db_controller')
const Sequelize = dbController.dbInterface.getSequelizeInstance()

/**
 * User Model
 */
class User extends Sequelize.Model {
}

/**
 * Init user model
 */

async function initUser () {
  let sequelizeInstance
  await dbController.dbInterface.getSequelizeConnection().then(resolve => {
    sequelizeInstance = resolve
  })
  console.log('called')
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
      sequelizeInstance,
      modelName: 'user'
    },
  )
}

/**
 * Makes functions available globally
 */
exports.user = {
  initUser: initUser,
  userClass: User
}
