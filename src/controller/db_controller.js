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
const setModel = require('../model/set')
const database = require('../db/database').sequeliceInstance

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
  getSubject: getSubject,
  addSet: addSet,
  updateSet: updateSet,
  deleteSet: deleteSet,
  getSet: getSet,
  getSets: getSets,
  addQuestion: addQuestion,
  updateQuestion: updateQuestion,
  deleteQuestion: deleteQuestion,
  getQuestion: getQuestion,
  getQuestions: getQuestions,
  addAnswer: addAnswer,
  updateAnswer: updateAnswer,
  deleteAnswer: deleteAnswer,
  getAnswer: getAnswer,
  getAnswers: getAnswers,
  initDb: initDb
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
    answerModel.destroy({truncate: true}),
    setModel.destroy({truncate: true})])
}

/**
 * returns user id or false in error case
 * @param firstName
 * @param lastName
 * @param email
 * @param title
 * @param password_encrypted
 * @returns {Promise<string> | Promise<boolean>}
 */
function addUser (rzId, firstName, lastName, email, title, password_encrypted) {
  // Create a new user
  return userModel.create({
    rzId: rzId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    title: title,
    password: password_encrypted
  }).then(userObj => {
    return userObj.rzId
  }, () => {
    return false
  })
}

/**
 * returns the user
 * @param rzId
 * @returns {Promise<user> | Promise<boolean>}
 */
function getUser (rzId) {
  return new Promise((resolve, reject) => {
    userModel.findAll({
      where: {
        rzId: rzId
      }
    }).then(result => {
      if (result.length > 0) {
        resolve(result[0].dataValues)
      } else {
        reject()
      }
    }, () => {
      reject(false)
    })
  })
}

/**
 *
 * @param rzId
 */
function deleteUser (rzId) {
  return new Promise((resolve, reject) => {
    userModel.destroy({
      where: {
        rzId: rzId
      }
    }).then(answerObj => {
      resolve(answerObj)
    }, (err) => {
      reject(false)
    })
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
 * @param topicId
 * @return {Promise<any>}
 */
function deleteTopic (topicId) {
  return new Promise((resolve, reject) => {
    topicModel.destroy({
      where: {
        id: topicId
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
 * add a new set
 *
 * @param setName
 * @param topicId
 * @returns {Promise<number | boolean>}
 */
function addSet (setName, topicId) {
  return setModel.create({
    setName,
    topicId
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

/**
 * Updates an existing set
 * @param setName
 * @param setId
 * @returns {Promise<true | false>}
 */
function updateSet (setName, setId) {
  return new Promise((resolve, reject) => {
    setModel.update({
      setName: setName
    }, {where: {id: setId}})
      .then(() => resolve(true))
      .catch(() => reject(false))
  })
}

/**
 * Deletes a set
 * @param setId
 */
function deleteSet (setId) {
  setModel.destroy({
    where: {
      id: setId
    }
  })
}

/**
 * returns a particular set
 * @param setId
 * @returns {Promise<any>}
 */
function getSet (setId) {
  return new Promise((resolve, reject) => {
    setModel.findAll({
      where: {
        id: setId
      }
    }).then(topicObj => {
      resolve(topicObj)
    }, () => {
      reject(false)
    })
  })
}

/**
 * Returns a set of a certain topic
 * @param topicId
 * @returns {Promise<any>}
 */
function getSets (topicId) {
  return new Promise((resolve, reject) => {
    setModel.findAll({
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
 * Returns id or false if fails
 * @param subjectName
 * @param rzId
 * @returns {PromiseLike<number> | Promise<boolean>}
 */
function addSubject (subjectName, rzId) {
  return subjectModel.create({
    subjectName: subjectName,
    rzId: rzId
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
 * @return {Promise<any>}
 */
function deleteSubject (subjectId) {
  return new Promise((resolve, reject) => {
    subjectModel.destroy({
      where: {
        id: subjectId
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
      where: {rzId: userId}
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
 * @param setId
 * @returns {PromiseLike<T | boolean> | Promise<T | boolean>}
 */
function addQuestion (question, setId) {
  return questionModel.create({
    question: question,
    setId: setId
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
    }, {
      where: {
        id: questionId
      }
    })
      .then(() => resolve())
      .catch(() => reject(false))
  })
}

/**
 *
 * @param questionId
 * @return {Promise<any>}
 */
function deleteQuestion (questionId) {
  return new Promise((resolve, reject) => {
    questionModel.destroy({
      where: {
        id: questionId
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
function getQuestions (setId) {
  return new Promise((resolve, reject) => {
    questionModel.findAll({
      where: {
        setId: setId
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
 * @returns {Promise<any>}
 */
function deleteAnswer (answerId) {
  return new Promise((resolve, reject) => {
    answerModel.destroy({
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
async function initDb () {

  // user has subjects
  subjectModel.belongsTo(userModel, {foreignKey: 'rzId'})

  // subject has topics
  subjectModel.hasMany(topicModel)
  topicModel.belongsTo(subjectModel)

  // topic has sets
  topicModel.hasMany(setModel)
  setModel.belongsTo(topicModel)

  // set has questions
  setModel.hasMany(questionModel)
  questionModel.belongsTo(setModel)

  // question and answer
  questionModel.hasMany(answerModel)
  answerModel.belongsTo(questionModel)

  await database.sync()
  return Promise.resolve()
}

