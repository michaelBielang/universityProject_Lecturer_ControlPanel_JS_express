/**
 * Created by Michael Bielang on 31.03.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
const userModel = require('../model/user')
const subjectModel = require('../model/subject')
const topicModel = require('../model/topic')
const questionModel = require('../model/question')
const answerModel = require('../model/answer')
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './user.db',
  sync: {force: true}
})
sequelize.sync()

/**
 * Makes db_interface available globally
 * @type {{initDb: (function(): Promise<*[]>), addUser: addUser, checkHealth: (function(): Promise<any>)}}
 */
exports.dbInterface = {
  checkHealth: checkHealth,
  addUser: addUser,
  initDb: initDb
}

/**
 * Add Models to sequelize
 * @returns {Promise<*[]>}
 */
async function initDbModels () {
  await Promise.all([userModel.user.initUser(), subjectModel.subject.initSubject()])
  return new Promise(resolve => resolve())
}

/**
 * Fills associations between tables
 * @returns {Promise<void>}
 */
async function setupAssociations () {
  userModel.user.userClass.hasMany(subjectModel.subject.subjectClass)
  subjectModel.subject.subjectClass.belongsTo(userModel.user.userClass)
}

/**
 * Add a new user to the database
 * @param firstName
 * @param lastName
 * @param title
 * @param email
 * @param password_encrypted
 */
async function addUser (firstName, lastName, title, email, password_encrypted) {
  // Create a new user
  await userModel.user.userClass.create({
    firstName: firstName,
    lastName: lastName,
    email: title,
    title: email,
    password: password_encrypted
  }).then(jane => {
    console.log('Jane\'s auto-generated ID:', jane.id)
  })
}

function getUser (email) {
  return userModel.user.userClass.findAll({
    where: {
      email: email
    }
  })
}

/**
 * Removes a user from db plus all data
 * @param id
 * @returns {*}
 */
async function removeUser (id) {
  //todo gather a list with all subjects before and delete them
  await userModel.user.destroy({
    where: {
      id: id
    }
  })
  // todo delete subjects
}

/**
 * Adds a new topic to the db
 * @param topic
 * @returns {PromiseLike<T | never> | Promise<T | never>}
 */
function addTopic (topic) {
  return topicModel.topic.topicClass.create({
    topicName: topic
  }).then(result => {return result.id})
}

/**
 * Deletes a topic with incl A/Q
 * @param id
 * @returns {Promise<void>}
 */
async function deleteTopic (id) {
  await topicModel.topic.destroy({
    where: {
      id: id
    }
  })
}

function getTopics () {
  //TODO
}

/**
 * Add a new subject
 * @param subjectName
 * @returns {Promise<void>}
 */
async function addSubject (subjectName) {
  await subjectModel.subject.subjectClass.create({
    subjectName: subjectName
  })
}

/**
 * Deletes a subject plus all topics
 * @param id
 * @returns {Promise<void>}
 */
async function deleteSubject (id) {
  await subjectModel.subject.subjectClass.destroy({
    where: {
      id: id
    }
  })
}

/**
 *
 * @param id
 * @returns {*}
 */
function getSubjects (id) {
  return subjectModel.subject.subjectClass.findAll()
}

/**
 * Adds a new question to the db
 * @param question
 * @returns {Promise<void>}
 */
async function addQuestion (question) {
  await questionModel.question.questionClass.create({
    question: question
  })
}

/**
 * Deletes question plus its answer
 * @param id
 * @returns {Promise<void>}
 */
async function deleteQuestion (id) {
  await questionModel.question.questionClass.destroy({
    where: {
      id: id
    }
  })
}

function getQuestions () {
  //TODO
}

/**
 * Add a new answer to the db
 * @param answer
 * @returns {Promise<void>}
 */
async function addAnswer (answer) {
  await answerModel.answer.answerClass.create({
    answer: answer
  })
}

/**
 * Deletes answer
 * @param id
 * @returns {Promise<void>}
 */
async function deleteAnswer (id) {
  await answerModel.answer.answerClass.destroy({
    where: {
      id: id
    }
  })
}

function getAnswer () {
  //TODO
}

/**
 * Checks if the database connection is valid
 * Resolve if true
 * Rejects if not
 * @returns {Promise<any>}
 */
function checkHealth () {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => resolve())
      .catch(() => reject())
  })
}

/**
 * Checks if tables are present
 * If not, create tables. Else pass
 * @returns {Promise<void>}
 */
async function initDb () {
  await initDbModels()
  await setupAssociations()
}

/*

initDb()
*/
