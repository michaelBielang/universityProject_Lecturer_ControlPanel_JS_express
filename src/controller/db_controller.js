/**
 * Created by Michael Bielang on 21.04.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
const Sequelize = require('sequelize')
const userModel = require('../model/user')
const topicModel = require('../model/topic')
const subjectModel = require('../model/subject')
// eslint-disable-next-line no-unused-vars
const initUser = userModel.user.initUser()
// eslint-disable-next-line no-unused-vars
const initTopic = topicModel.topic.initTopic()
// eslint-disable-next-line no-unused-vars
const initSubject = subjectModel.subject.initSubject()
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './user.sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
})
sequelize.sync()

exports.dbInterface = {
  addUser: addUser,
  checkHealth: checkHealth,
  closeConnection: closeConnection,
  getUser: getUser,
  deleteUser: deleteUser,
  addTopic: addTopic,
  deleteTopic: deleteTopic,
  getTopics: getTopics,
  dropDb: dropDb,
  updateTopic: updateTopic,
  getTopic: getTopic,
  addSubject: addSubject,
  updateSubject: updateSubject,
  deleteSubject: deleteSubject,
  getSubjects: getSubjects,
  getSubject: getSubject
}

function closeConnection () {
  sequelize.close()
}

/**
 * Drops all tables -relevant for tests only
 * @returns {Promise<unknown[]>}
 */
function dropDb () {
  return Promise.all([topicModel.topic.topicClass.destroy({truncate: true}),
    userModel.user.userClass.destroy({truncate: true})])
}

function checkHealth () {
  return new Promise(((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  }))
}

function addUser (firstName, lastName, email, title, password_encrypted) {
  // Create a new user
  return userModel.user.userClass.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    title: title,
    password: password_encrypted
  }).then(userObj => {
    return userObj.id
  }, () => {
    return false
  })
}

function getUser (email) {
  return new Promise((resolve, reject) => {
    userModel.user.userClass.findAll({
      where: {
        email: email
      }
    }).then(result => {
      resolve(result[0].dataValues)
    }, () => {
      reject(false)
    })
  })
}

function deleteUser (email) {
  userModel.user.userClass.destroy({
    where: {
      email: email
    }
  })
}

function addTopic (title) {
  return topicModel.topic.topicClass.create({
    topicName: title
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

function updateTopic (topicname, new_id) {
  return new Promise((resolve, reject) => {
    topicModel.topic.topicClass.update({
      topicName: topicname
    }, {where: {id: new_id}})
      .then(() => resolve())
      .catch(() => reject(false))
  })
}

function deleteTopic (id) {
  topicModel.topic.topicClass.destroy({
    where: {
      id: id
    }
  })
}

function getTopic (id) {
  return new Promise((resolve, reject) => {
    topicModel.topic.topicClass.findAll({
      where: {
        id: id
      }
    }).then(topicObj => {
      resolve(topicObj)
    }, () => {
      reject(false)
    })
  })
}

function getTopics () {
  return new Promise((resolve, reject) => {
    topicModel.topic.topicClass.findAll({}).then(results => {
      resolve(results)
    }, () => {
      reject(false)
    })
  })
}

// todo write tests from here to end
function addSubject (subjectName) {
  return subjectModel.subject.subjectClass.create({
    subjectName: subjectName
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

function updateSubject (subjectName, new_id) {
  return new Promise((resolve, reject) => {
    subjectModel.subject.subjectClass.update({
      subjectName: subjectName
    }, {where: {id: new_id}})
      .then(() => resolve())
      .catch(() => reject(false))
  })
}

function deleteSubject (id) {
  subjectModel.subject.subjectClass.destroy({
    where: {
      id: id
    }
  })
}

function getSubject (id) {
  return new Promise((resolve, reject) => {
    subjectModel.subject.subjectClass.findAll({
      where: {
        id: id
      }
    }).then(topicObj => {
      resolve(topicObj)
    }, () => {
      reject(false)
    })
  })
}

function getSubjects () {
  return new Promise((resolve, reject) => {
    subjectModel.subject.subjectClass.findAll({}).then(results => {
      resolve(results)
    }, () => {
      reject(false)
    })
  })
}

