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
  setupAssociations: setupAssociations
}

function closeConnection () {
  database.close()
}

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

function addUser (firstName, lastName, email, title, password_encrypted) {
  // Create a new user
  return userModel.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    title: title,
    password: password_encrypted
  }).then(userObj => {
    console.log('success')
    return userObj.id
  }, err => {
    console.log(err)
    return false
  })
}

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

function deleteUser (email) {
  userModel.destroy({
    where: {
      email: email
    }
  })
}

function addTopic (title) {
  return topicModel.create({
    topicName: title
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

function updateTopic (topicname, new_id) {
  return new Promise((resolve, reject) => {
    topicModel.update({
      topicName: topicname
    }, {where: {id: new_id}})
      .then(() => resolve())
      .catch(() => reject(false))
  })
}

function deleteTopic (id) {
  topicModel.destroy({
    where: {
      id: id
    }
  })
}

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

function getTopics () {
  return new Promise((resolve, reject) => {
    topicModel.findAll({}).then(results => {
      resolve(results)
    }, () => {
      reject(false)
    })
  })
}

function addSubject (subjectName) {
  return subjectModel.create({
    subjectName: subjectName
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

function updateSubject (subjectName, id) {
  return new Promise((resolve, reject) => {
    subjectModel.update({
      subjectName: subjectName
    }, {where: {id: id}})
      .then(() => resolve())
      .catch(() => reject(false))
  })
}

function deleteSubject (id) {
  subjectModel.destroy({
    where: {
      id: id
    }
  })
}

function getSubject (id) {
  return new Promise((resolve, reject) => {
    subjectModel.findAll({
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
    subjectModel.findAll({}).then(results => {
      resolve(results)
    }, err => {
      console.log(err)
      reject(false)
    })
  })
}

function addQuestion (content) {
  return questionModel.create({
    question: content
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

function updateQuestion (newQuestion, questionId) {
  return new Promise((resolve, reject) => {
    questionModel.update({
      question: newQuestion
    }, {where: {id: questionId}})
      .then(() => resolve())
      .catch(() => reject(false))
  })
}

function deleteQuestion (id) {
  questionModel.destroy({
    where: {
      id: id
    }
  })
}

function getQuestion (id) {
  return new Promise((resolve, reject) => {
    questionModel.findAll({
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

function getQuestions () {
  return new Promise((resolve, reject) => {
    questionModel.findAll({}).then(results => {
      resolve(results)
    }, () => {
      reject(false)
    })
  })
}

// implement + tests

function addAnswer (content, isCorrect) {
  return answerModel.create({
    answer: content,
    isCorrect: isCorrect
  }).then(result => {
    return result.id
  }, () => {
    return false
  })
}

function updateAnswer (newAnswer, answerId) {
  return new Promise((resolve, reject) => {
    answerModel.update({
      answer: newAnswer
    }, {where: {id: answerId}})
      .then(() => resolve())
      .catch(() => reject(false))
  })
}

function deleteAnswer (answerId) {
  answerModel.destroy({
    where: {
      id: answerId
    }
  })
}

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

function getAnswers () {
  return new Promise((resolve, reject) => {
    answerModel.findAll({}).then(results => {
      resolve(results)
    }, () => {
      reject(false)
    })
  })
}

async function setupAssociations () {
  await database.sync()

  /*  userModel.user.userClass.hasMany(subjectModel.subject.subjectClass)
    subjectModel.subject.subjectClass.belongsTo(userModel.user.userClass)

    // subject and topic
    subjectModel.subject.subjectClass.hasMany(topicModel.topic.topicClass)
    topicModel.topic.topicClass.belongsTo(subjectModel.subject.subjectClass)

    // topic and question
    topicModel.topic.topicClass.hasMany(questionModel.question.questionClass)
    questionModel.question.questionClass.belongsTo(topicModel.topic.topicClass)

    // question and answer
    questionModel.question.questionClass.hasMany(answerModel.answer.answerClass)
    answerModel.answer.answerClass.belongsTo(questionModel.question.questionClass)
    console.log('resolve2')*/
  return Promise.resolve()
}


