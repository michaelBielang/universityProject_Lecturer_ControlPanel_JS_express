/**
 * Created by Michael Bielang on 21.04.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */

// important TODO -> user.sqlite is created where db_controller file is located. Make one global path possible
const userModel = require('../model/user')
const topicModel = require('../model/topic')
const subjectModel = require('../model/subject')
const questionModel = require('../model/question')
const answerModel = require('../model/answer')
const database = require('../db/database').sequeliceInstance

exports.dbInterface = {
  checkHealth: checkHealth,
  setupAssociations: setupAssociations,
  closeConnection: closeConnection,
  dropDb: dropDb,
  addUser: addUser,
  getUser: getUser,
  deleteUser: deleteUser,
  addTopic: addTopic,
  getTopic: getTopic,
  getTopics: getTopics,
  deleteTopic: deleteTopic,
  updateTopic: updateTopic,
  addSubject: addSubject,
  getSubject: getSubject,
  getSubjects: getSubjects,
  deleteSubject: deleteSubject,
  updateSubject: updateSubject,
  addQuestion: addQuestion,
  getQuestion: getQuestion,
  getQuestions: getQuestions,
  deleteQuestion: deleteQuestion,
  updateQuestion: updateQuestion,
  addAnswer: addAnswer,
  getAnswer: getAnswer,
  getAnswers: getAnswers,
  deleteAnswer: deleteAnswer,
  updateAnswer: updateAnswer,
}

/**
 * close Connection
 */
function closeConnection () {
  database.close()
}

/**
 * returns true if db connection works
 * @returns {Promise<any>}
 */
function checkHealth () {
  return new Promise(((resolve, reject) => {
    database
      .authenticate()
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  }))
}

/**
 * Drops all tables -relevant for tests only
 * @returns {Promise<unknown[]>}
 */
function dropDb () {
  return Promise.all([topicModel.destroy({truncate: true}),
    userModel.destroy({truncate: true}),
    subjectModel.destroy({truncate: true}),
    questionModel.destroy({truncate: true}),
    answerModel.destroy({truncate: true})])
}

/**
 * returns user id or false in error case
 * @param firstName
 * @param lastName
 * @param email
 * @param title
 * @param password_encrypted
 * @returns {Promise<number> | Promise<boolean>}
 */
function addUser (firstName, lastName, email, title, password_encrypted) {
  // Create a new user
  return userModel.create({
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

/**
 * returns user id or false in error case
 * @param email
 * @returns {Promise<number> | Promise<boolean>}
 */
function getUser (email) {
  return new Promise((resolve, reject) => {
    userModel.findAll({
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

/**
 *
 * @param email
 */
function deleteUser (email) {
  userModel.destroy({
    where: {
      email: email
    }
  })
}

/**
 * returns id or false if fails
 * @param title
 * @param subjectId
 * @returns {Promise<number> | Promise<boolean>}}
 */
function addTopic (title, subjectId) {
  return topicModel.create({
    topicName: title,
    subjectId: subjectId
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

/**
 *  returns topic id or false if fails
 * @param newTopicName
 * @param topicId
 * @returns {Promise<number> | Promise<boolean>}
 */
function updateTopic (newTopicName, topicId) {
  return new Promise((resolve, reject) => {
    topicModel.update({
      topicName: newTopicName
    }, {where: {id: topicId}})
      .then(() => resolve(true))
      .catch(() => reject(false))
  })
}

/**
 *
 * @param id
 */
function deleteTopic (id) {
  topicModel.destroy({
    where: {
      id: id
    }
  })
}

/**
 *
 * @param id
 * @returns {Promise<any> | Promise<boolean>}
 */
function getTopic (id) {
  return new Promise((resolve, reject) => {
    topicModel.findAll({
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

/**
 * returns a list of topics for particular subject.
 * @returns {Promise<any> | Promise<boolean>}
 */
function getTopics (subjectId) {
  return new Promise((resolve, reject) => {
    topicModel.findAll({
      where: {
        subjectId: subjectId
      }
    }).then(results => {
      resolve(results)
    }, () => {
      reject(false)
    })
  })
}

/**
 * Returns id or false if fails
 * @param subjectName
 * @param userId
 * @returns {PromiseLike<number> | Promise<boolean>}
 */
function addSubject (subjectName, userId) {
  return subjectModel.create({
    subjectName: subjectName,
    userId: userId
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

/**
 *
 * @param subjectName
 * @param subjectId
 * @returns {Promise<any>}
 */
function updateSubject (subjectName, subjectId) {
  return new Promise((resolve, reject) => {
    subjectModel.update({
      subjectName: subjectName
    }, {where: {id: subjectId}})
      .then(() => resolve(true))
      .catch(() => reject(false))
  })
}

/**
 *
 * @param subjectId
 */
function deleteSubject (subjectId) {
  subjectModel.destroy({
    where: {
      id: subjectId
    }
  })
}

/**
 *
 * @param subjectId
 * @returns {Promise<any> | Promise<boolean>}
 */
function getSubject (subjectId) {
  return new Promise((resolve, reject) => {
    subjectModel.findAll({
      where: {
        id: subjectId
      }
    }).then(topicObj => {
      resolve(topicObj)
    }, () => {
      reject(false)
    })
  })
}

/**
 *
 * @returns {Promise<any> | Promise<boolean>}
 */
function getSubjects (userId) {
  return new Promise((resolve, reject) => {
    subjectModel.findAll({
      where: {userId: userId}
    }).then(results => {
      resolve(results)
    }, () => {
      reject(false)
    })
  })
}

/**
 *
 * @param question
 * @param topicId
 * @returns {PromiseLike<T | boolean> | Promise<T | boolean>}
 */
function addQuestion (question, topicId) {
  return questionModel.create({
    question: question,
    topicId: topicId
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

/**
 *
 * @param newQuestion
 * @param questionId
 * @returns {Promise<any>}
 */
function updateQuestion (newQuestion, questionId) {
  return new Promise((resolve, reject) => {
    questionModel.update({
      question: newQuestion
    }, {where: {id: questionId}})
      .then(() => resolve())
      .catch(() => reject(false))
  })
}

/**
 *
 * @param questionId
 */
function deleteQuestion (questionId) {
  questionModel.destroy({
    where: {
      id: questionId
    }
  })
}

/**
 *
 * @param questionId
 * @returns {Promise<any>}
 */
function getQuestion (questionId) {
  return new Promise((resolve, reject) => {
    questionModel.findAll({
      where: {
        id: questionId
      }
    }).then(topicObj => {
      resolve(topicObj)
    }, () => {
      reject(false)
    })
  })
}

/**
 *
 * @returns {Promise<any>}
 */
function getQuestions (topicId) {
  return new Promise((resolve, reject) => {
    questionModel.findAll({
      where: {
        topicId: topicId
      }
    }).then(results => {
      resolve(results)
    }, () => {
      reject(false)
    })
  })
}

/**
 *
 * @param content
 * @param isCorrect
 * @param questionId
 * @returns {PromiseLike<T | boolean> | Promise<T | boolean>}
 */
function addAnswer (content, isCorrect, questionId) {
  return answerModel.create({
    answer: content,
    isCorrect: isCorrect,
    questionId: questionId
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

/**
 *
 * @param newAnswer
 * @param answerId
 * @returns {Promise<any>}
 */
function updateAnswer (newAnswer, answerId) {
  return new Promise((resolve, reject) => {
    answerModel.update({
      answer: newAnswer
    }, {where: {id: answerId}})
      .then(() => resolve())
      .catch(() => reject(false))
  })
}

/**
 *
 * @param answerId
 */
function deleteAnswer (answerId) {
  answerModel.destroy({
    where: {
      id: answerId
    }
  })
}

/**
 *
 * @param answerId
 * @returns {Promise<any>}
 */
function getAnswer (answerId) {
  return new Promise((resolve, reject) => {
    answerModel.findAll({
      where: {
        id: answerId
      }
    }).then(answerObj => {
      resolve(answerObj)
    }, () => {
      reject(false)
    })
  })
}

/**
 *
 * @returns {Promise<any>}
 */
function getAnswers (questionId) {
  return new Promise((resolve, reject) => {
    answerModel.findAll({
      where: {
        questionId: questionId
      }
    }).then(results => {
      resolve(results)
    }, () => {
      reject(false)
    })
  })
}

/**
 *
 * @returns {Promise<void>}
 */
async function setupAssociations () {

  // user + subject
  userModel.hasMany(subjectModel)
  subjectModel.belongsTo(userModel)

  // subject and topic
  subjectModel.hasMany(topicModel)
  topicModel.belongsTo(subjectModel)

  // topic and question
  topicModel.hasMany(questionModel)
  questionModel.belongsTo(topicModel)

  // question and answer
  questionModel.hasMany(answerModel)
  answerModel.belongsTo(questionModel)
  await database.sync()
  return Promise.resolve()
}

