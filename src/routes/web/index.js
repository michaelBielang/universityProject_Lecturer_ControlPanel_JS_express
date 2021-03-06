const questionRouter = require('../api/question')
const answerRouter = require('../api/answer')
const topicRouter = require('../api/topic')
const subjectRouter = require('../api/subject')
const setRouter = require('../api/set')
const userRouter = require('../api/user')

const loginController = require('./login')
const homeController = require('./home')
const subjectPage = require('./subject')
const logoutController = require('./logout')
const topicController = require('./topic')
const questionController = require('./question')
const answerController = require('./answer')
const setController = require('./set')
const ccController = require('./settings')
const session = require('express-session')

// sessionMiddleware tests if user is logged in
function sessionMiddleware (req, res, next) {
  if (session.user) {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = (app) => {
  // routes for Dozentenverwaltung (needs session) (GET, POST, UPDATE, REMOVE)
  app.use('/', loginController)
  app.use('/home', sessionMiddleware, homeController)
  app.use('/subject', sessionMiddleware, subjectPage)
  app.use('/topic', sessionMiddleware, topicController)
  app.use('/set', sessionMiddleware, setController)
  app.use('/logout', sessionMiddleware, logoutController)
  app.use('/question', sessionMiddleware, questionController)
  app.use('/answer', sessionMiddleware, answerController)
  app.use('/cc', sessionMiddleware, ccController)

  // routes for API (only GET)
  app.use('/api/users', userRouter)
  app.use('/api/question', questionRouter)
  app.use('/api/answer', answerRouter)
  app.use('/api/topic', topicRouter)
  app.use('/api/subject', subjectRouter)
  app.use('/api/set', setRouter)
}
